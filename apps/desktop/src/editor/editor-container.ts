// Custom editor container based on Ink Stone
import { SignalWatcher, WithDisposable } from '@ink/stone-global/lit';
import type { DocMode } from '@ink/stone-model';
import { ThemeProvider } from '@ink/stone-shared/services';
import { BlockStdScope, ShadowlessElement } from '@ink/stone-std';
import { type BlockModel, type ExtensionType, type Store } from '@ink/stone-store';
import { computed, signal } from '@preact/signals-core';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';

import type { InkSourceEditor } from './source-editor';

export class InkEditorContainer extends SignalWatcher(WithDisposable(ShadowlessElement)) {
  static override styles = css`
    .ink-editor-mode-container {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .ink-editor-mode-container > * {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .ink-editor-mode-container .hidden {
      display: none !important;
    }

    .ink-page-viewport {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
      overflow-y: auto;
      container-name: viewport;
      container-type: inline-size;
      font-family: var(--ink-font-family);
      height: 100%;
    }
    .ink-page-viewport * {
      box-sizing: border-box;
    }

    @media print {
      .ink-page-viewport {
        height: auto;
      }
    }

    .playground-page-editor-container {
      flex-grow: 1;
      font-family: var(--ink-font-family);
      display: block;
    }

    .playground-page-editor-container * {
      box-sizing: border-box;
    }

    @media print {
      .playground-page-editor-container {
        height: auto;
      }
    }

    .edgeless-editor-container {
      font-family: var(--ink-font-family);
      background: var(--ink-background-primary-color);
      display: block;
      height: 100%;
      position: relative;
      overflow: clip;
    }

    .edgeless-editor-container * {
      box-sizing: border-box;
    }

    @media print {
      .edgeless-editor-container {
        height: auto;
      }
    }

    .ink-canvas-viewport {
      display: block;
      height: 100%;
      position: relative;
      overflow: clip;
      container-name: viewport;
      container-type: inline-size;
    }

    .ink-source-viewport {
      display: block;
      height: 100%;
      position: relative;
      overflow: hidden;
      background: var(--ink-background-primary-color);
    }

    .source-editor-container {
      height: 100%;
      width: 100%;
    }
  `;

  private readonly _doc = signal<Store>();

  private readonly _edgelessSpecs = signal<ExtensionType[]>([]);

  private readonly _mode = signal<DocMode>('page');

  private readonly _pageSpecs = signal<ExtensionType[]>([]);

  // Current theme for source mode (tracked for reactivity)
  private readonly _currentTheme = signal<'light' | 'dark'>(
    document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light',
  );

  // Theme observer for source mode
  private _themeObserver: MutationObserver | null = null;

  // Source mode content
  private readonly _sourceContent = signal<string>('');

  // Callback when source content changes
  private _onSourceChange: ((content: string) => void) | null = null;

  // Callback when user requests to toggle mode (e.g., Cmd+/ in source editor)
  private _onToggleMode: (() => void) | null = null;

  // Track if source editor has been created to avoid recreating it
  private readonly _sourceEditorCreated = signal<boolean>(false);

  private readonly _specs = computed(() => {
    const mode = this._mode.value;
    // Don't return empty array for source mode to avoid recreating BlockStdScope
    // Source mode will simply hide the editor template, not destroy it
    return mode === 'page' || mode === 'source' ? this._pageSpecs.value : this._edgelessSpecs.value;
  });

  private readonly _std = computed(() => {
    return new BlockStdScope({
      store: this.doc,
      extensions: this._specs.value,
    });
  });

  private readonly _editorTemplate = computed(() => {
    return this._std.value.render();
  });

  get doc() {
    return this._doc.value as Store;
  }

  set doc(doc: Store) {
    this._doc.value = doc;
  }

  set edgelessSpecs(specs: ExtensionType[]) {
    this._edgelessSpecs.value = specs;
  }

  get edgelessSpecs() {
    return this._edgelessSpecs.value;
  }

  get host() {
    try {
      return this.std.host;
    } catch {
      return null;
    }
  }

  get mode() {
    return this._mode.value;
  }

  set mode(mode: DocMode) {
    this._mode.value = mode;
  }

  set pageSpecs(specs: ExtensionType[]) {
    this._pageSpecs.value = specs;
  }

  get pageSpecs() {
    return this._pageSpecs.value;
  }

  get sourceContent() {
    return this._sourceContent.value;
  }

  set sourceContent(content: string) {
    this._sourceContent.value = content;
  }

  set onSourceChange(callback: ((content: string) => void) | null) {
    this._onSourceChange = callback;
  }

  set onToggleMode(callback: (() => void) | null) {
    this._onToggleMode = callback;
  }

  get rootModel() {
    return this.doc.root as BlockModel;
  }

  get std() {
    return this._std.value;
  }

  override connectedCallback() {
    super.connectedCallback();

    this._disposables.add(this.doc.slots.rootAdded.subscribe(() => this.requestUpdate()));

    // If root already exists (content was loaded before editor was created),
    // trigger an update to render the content
    if (this.doc.root) {
      this.requestUpdate();
    }

    // Set up theme observer to watch for theme changes
    this._themeObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          const newTheme =
            document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          if (this._currentTheme.value !== newTheme) {
            this._currentTheme.value = newTheme;
            // Force re-render if in source mode
            if (this._mode.value === 'source') {
              this.requestUpdate();
            }
          }
        }
      }
    });

    this._themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    // Clean up theme observer
    if (this._themeObserver) {
      this._themeObserver.disconnect();
      this._themeObserver = null;
    }
  }

  override firstUpdated() {
    if (this.mode === 'page') {
      setTimeout(() => {
        if (this.autofocus && this.mode === 'page') {
          const richText = this.querySelector('rich-text');
          const inlineEditor = (richText as any)?.inlineEditor;
          inlineEditor?.focusEnd();
        }
      });
    }
  }

  override render() {
    const mode = this._mode.value;
    let appTheme = 'light';
    let edgelessTheme = 'light';

    // Get theme for source mode
    if (mode !== 'source') {
      try {
        const themeService = this.std.get(ThemeProvider);
        appTheme = themeService.app$.value;
        edgelessTheme = themeService.edgeless$.value;
      } catch {
        // ThemeProvider may not be available
      }
    }

    const theme = this._currentTheme.value;

    // Mark source editor as created when entering source mode
    if (mode === 'source' && !this._sourceEditorCreated.value) {
      this._sourceEditorCreated.value = true;
    }

    const shouldRenderSourceEditor = this._sourceEditorCreated.value;

    // Render both editors in the same template, control visibility with CSS
    // This prevents DOM recreation when switching modes
    return html`${keyed(
      this.rootModel?.id,
      html`
        <div class="ink-editor-mode-container">
          <!-- Source mode editor - render once created, then keep in DOM -->
          ${shouldRenderSourceEditor
            ? html`
                <div
                  class=${mode === 'source' ? 'ink-source-viewport' : 'ink-source-viewport hidden'}
                  data-theme=${theme}
                >
                  <ink-source-editor
                    .content=${this._sourceContent.value}
                    .theme=${theme}
                    .onContentChange=${(content: string) => {
                      this._sourceContent.value = content;
                      this._onSourceChange?.(content);
                    }}
                    .onToggleMode=${() => {
                      this._onToggleMode?.();
                    }}
                  ></ink-source-editor>
                </div>
              `
            : ''}

          <!-- Page/Edgeless mode editor -->
          <div
            class=${mode !== 'source' && mode === 'page'
              ? 'ink-page-viewport'
              : mode !== 'source'
                ? 'ink-canvas-viewport'
                : 'ink-page-viewport hidden'}
            data-theme=${mode === 'page' ? appTheme : edgelessTheme}
          >
            <div
              class=${mode === 'page'
                ? 'page-editor playground-page-editor-container'
                : 'edgeless-editor-container'}
            >
              ${this._editorTemplate.value}
            </div>
          </div>
        </div>
      `,
    )}`;
  }

  switchEditor(mode: DocMode) {
    this._mode.value = mode;
  }

  getSourceEditor(): InkSourceEditor | null {
    return this.querySelector('ink-source-editor');
  }

  @property({ attribute: false })
  override accessor autofocus = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-editor-container': InkEditorContainer;
  }
}
