// Source code editor component using CodeMirror 6
import { closeBrackets, closeBracketsKeymap } from '@codemirror/autocomplete';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { EditorState, type Extension, Prec } from '@codemirror/state';
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
  rectangularSelection,
} from '@codemirror/view';
import { WithDisposable } from '@ink/stone-global/lit';
import { ShadowlessElement } from '@ink/stone-std';
import { css, html } from 'lit';
import { property, state } from 'lit/decorators.js';

// Create theme using CSS variables from the app's theme system
// This allows the source editor to follow custom themes
function createTheme(isDark: boolean) {
  return EditorView.theme(
    {
      '&': {
        backgroundColor: 'var(--ink-background-primary-color)',
        color: 'var(--ink-text-primary-color)',
        height: '100%',
      },
      '.cm-content': {
        fontFamily:
          'var(--ink-font-mono, ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace)',
        fontSize: 'var(--ink-font-base, 14px)',
        lineHeight: 'var(--ink-line-height, 1.6)',
        padding: '16px 0',
        caretColor: 'var(--ink-text-primary-color)',
      },
      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: 'var(--ink-text-primary-color)',
      },
      '.cm-gutters': {
        backgroundColor: 'var(--ink-background-secondary-color)',
        color: 'var(--ink-text-secondary-color)',
        border: 'none',
        borderRight: '1px solid var(--ink-border-color)',
      },
      '.cm-activeLineGutter': {
        backgroundColor: 'var(--ink-hover-color)',
      },
      '.cm-activeLine': {
        backgroundColor: 'var(--ink-hover-color)',
      },
      '.cm-selectionBackground, &.cm-focused .cm-selectionBackground': {
        backgroundColor: isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(30, 150, 235, 0.2)',
      },
      '.cm-scroller': {
        overflow: 'auto',
      },
      '.cm-line': {
        padding: '0 16px',
      },
      // Syntax highlighting using theme colors
      '.cm-header': {
        color: 'var(--ink-primary-color)',
        fontWeight: 'bold',
      },
      '.cm-strong': {
        color: 'var(--ink-text-emphasis-color)',
        fontWeight: 'bold',
      },
      '.cm-emphasis': {
        color: 'var(--ink-secondary-color)',
        fontStyle: 'italic',
      },
      '.cm-link': {
        color: 'var(--ink-link-color)',
      },
      '.cm-url': {
        color: 'var(--ink-link-color)',
        textDecoration: 'underline',
      },
      '.cm-quote': {
        color: 'var(--ink-quote-color)',
        fontStyle: 'italic',
      },
      '.cm-list': {
        color: 'var(--ink-text-emphasis-color)',
      },
      '.cm-meta': {
        color: 'var(--ink-text-secondary-color)',
      },
      '.cm-keyword': {
        color: 'var(--ink-primary-color)',
      },
      '.cm-string': {
        color: 'var(--ink-text-highlight-foreground-green)',
      },
      '.cm-comment': {
        color: 'var(--ink-text-secondary-color)',
        fontStyle: 'italic',
      },
    },
    { dark: isDark },
  );
}

export class InkSourceEditor extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .source-editor-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .cm-editor {
      height: 100%;
    }

    .cm-scroller {
      font-family: var(--ink-font-mono);
    }
  `;

  private _editorView: EditorView | null = null;

  @property({ type: String })
  accessor content: string = '';

  @property({ type: String })
  accessor theme: 'light' | 'dark' = 'light';

  @property({ attribute: false })
  accessor onContentChange: ((content: string) => void) | null = null;

  @property({ attribute: false })
  accessor onToggleMode: (() => void) | null = null;

  @state()
  private accessor _initialized = false;

  private _getExtensions(): Extension[] {
    // High-priority keymap to intercept Cmd+/ before default comment toggle
    const toggleModeKeymap = Prec.highest(
      keymap.of([
        {
          key: 'Mod-/',
          run: () => {
            if (this.onToggleMode) {
              this.onToggleMode();
              return true; // Prevent default behavior
            }
            return false;
          },
        },
      ]),
    );

    return [
      toggleModeKeymap, // Must be first to have highest priority
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      history(),
      foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      rectangularSelection(),
      crosshairCursor(),
      highlightSelectionMatches(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        indentWithTab,
      ]),
      markdown({
        base: markdownLanguage,
        codeLanguages: languages,
      }),
      createTheme(this.theme === 'dark'),
      EditorView.updateListener.of((update) => {
        if (update.docChanged && this.onContentChange) {
          this.onContentChange(update.state.doc.toString());
        }
      }),
      EditorView.lineWrapping,
    ];
  }

  getValue(): string {
    return this._editorView?.state.doc.toString() ?? '';
  }

  setValue(content: string): void {
    if (this._editorView) {
      const currentContent = this._editorView.state.doc.toString();
      if (currentContent !== content) {
        this._editorView.dispatch({
          changes: {
            from: 0,
            to: currentContent.length,
            insert: content,
          },
        });
      }
    } else {
      this.content = content;
    }
  }

  focus(): void {
    this._editorView?.focus();
  }

  override connectedCallback(): void {
    super.connectedCallback();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._destroyEditor();
  }

  override firstUpdated(): void {
    this._initEditor();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('theme') && this._editorView) {
      // Recreate editor with new theme
      const content = this.getValue();
      this._destroyEditor();
      this.content = content;
      this._initEditor();
    }
    if (changedProperties.has('content')) {
      // Update content when it changes
      if (this._editorView && this._initialized) {
        // Editor is already initialized, update its content
        this.setValue(this.content);
      } else if (!this._initialized) {
        // Editor not yet initialized, will use content in _initEditor
      }
    }
  }

  private _initEditor(): void {
    const container = this.renderRoot.querySelector('.source-editor-container');
    if (!container) return;

    const state = EditorState.create({
      doc: this.content,
      extensions: this._getExtensions(),
    });

    this._editorView = new EditorView({
      state,
      parent: container as HTMLElement,
    });

    this._initialized = true;

    // Focus editor after a short delay
    requestAnimationFrame(() => {
      this._editorView?.focus();
    });
  }

  private _destroyEditor(): void {
    if (this._editorView) {
      this._editorView.destroy();
      this._editorView = null;
      this._initialized = false;
    }
  }

  override render() {
    return html` <div class="source-editor-container"></div> `;
  }
}

// Register custom element
if (!customElements.get('ink-source-editor')) {
  customElements.define('ink-source-editor', InkSourceEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-source-editor': InkSourceEditor;
  }
}
