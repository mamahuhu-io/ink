import { SignalWatcher, WithDisposable } from '@ink/stone-global/lit';
import { noop } from '@ink/stone-global/utils';
import { DoneIcon } from '@ink/stone-icons/lit';
import { ColorScheme } from '@ink/stone-model';
import type { RichText } from '@ink/stone-rich-text';
import { ThemeProvider } from '@ink/stone-shared/services';
import { unsafeCSSVar } from '@ink/stone-shared/theme';
import type { InkTextAttributes } from '@ink/stone-shared/types';
import { type BlockStdScope, ShadowlessElement } from '@ink/stone-std';
import { InlineManagerExtension } from '@ink/stone-std/inline';
import { effect, type Signal, signal } from '@preact/signals-core';
import { css, html } from 'lit';
import { property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { codeToTokensBase, type ThemedToken } from 'shiki';
import * as Y from 'yjs';

import { MermaidEditorUnitSpecExtension } from './inline-spec.js';
import { MermaidBlockService, MermaidBlockServiceIdentifier } from './mermaid-block-service.js';

export const MermaidEditorInlineManagerExtension = InlineManagerExtension<InkTextAttributes>({
  id: 'mermaid-inline-editor',
  enableMarkdown: false,
  specs: [MermaidEditorUnitSpecExtension.identifier],
});

export class MermaidEditorMenu extends SignalWatcher(WithDisposable(ShadowlessElement)) {
  static override styles = css`
    .mermaid-editor-container {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-template-rows: auto auto auto;
      grid-template-areas:
        "editor-box confirm-box"
        "preview-box preview-box"
        "hint-box hint-box";

      padding: 8px;
      border-radius: 8px;
      border: 0.5px solid ${unsafeCSSVar('borderColor')};
      background: ${unsafeCSSVar('backgroundOverlayPanelColor')};

      box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.14);
    }

    .mermaid-editor {
      grid-area: editor-box;
      width: 680px;
      min-height: 120px;
      max-height: 400px;
      padding: 4px 10px;

      border-radius: 4px;
      background: ${unsafeCSSVar('white10')};

      box-shadow: 0px 0px 0px 2px rgba(30, 150, 235, 0.3);

      font-family: ${unsafeCSSVar('fontCodeFamily')};
      border: 1px solid transparent;

      overflow-y: auto;
    }
    .mermaid-editor:focus-within {
      border: 1px solid ${unsafeCSSVar('blue700')};
    }

    .mermaid-editor-confirm {
      grid-area: confirm-box;
      display: flex;
      align-items: flex-end;
      padding-left: 10px;
    }

    .mermaid-editor-preview {
      grid-area: preview-box;
      max-height: 300px;
      overflow: auto;
      padding: 12px;
      margin-top: 8px;
      border-radius: 4px;
      background: ${unsafeCSSVar('white10')};
      display: none
      align-items: center;
      justify-content: center;
    }

    .mermaid-editor-preview svg {
      max-width: 100%;
      height: auto;
    }

    .mermaid-editor-preview-error {
      color: ${unsafeCSSVar('errorColor')};
      font-size: 12px;
      padding: 12px;
    }

    .mermaid-editor-preview-empty {
      color: ${unsafeCSSVar('placeholderColor')};
      font-size: 12px;
    }

    .mermaid-editor-hint {
      grid-area: hint-box;
      padding-top: 6px;

      color: ${unsafeCSSVar('placeholderColor')};

      font-family: "SF Pro Text";
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: -0.24px;
    }
  `;

  highlightTokens$: Signal<ThemedToken[][]> = signal([]);
  previewSvg$: Signal<string | null> = signal(null);
  previewError$: Signal<string | null> = signal(null);

  yText!: Y.Text;
  private _mermaidService!: MermaidBlockService;

  get inlineManager() {
    return this.std.get(MermaidEditorInlineManagerExtension.identifier);
  }

  get richText() {
    return this.querySelector<RichText>('rich-text');
  }

  private readonly _getVerticalScrollContainer = () => {
    return this.querySelector('.mermaid-editor');
  };

  private _updateHighlightTokens(text: string) {
    const editorTheme = this.std.get(ThemeProvider).theme;
    const theme = editorTheme === ColorScheme.Dark ? 'dark-plus' : 'light-plus';

    codeToTokensBase(text, {
      lang: 'mermaid',
      theme,
    })
      .then((token) => {
        this.highlightTokens$.value = token;
      })
      .catch(console.error);
  }

  private async _updatePreview(text: string) {
    if (!text.trim()) {
      this.previewSvg$.value = null;
      this.previewError$.value = null;
      return;
    }

    try {
      const svg = await this._mermaidService.render(text, 'auto');
      this.previewSvg$.value = svg;
      this.previewError$.value = null;

      // Auto-detect and update diagram type
      const detectedType = this._mermaidService.detectDiagramType(text);
      if (detectedType && this.diagramTypeSignal) {
        this.diagramTypeSignal.value = detectedType;
      }
    } catch (error) {
      this.previewSvg$.value = null;
      this.previewError$.value = error instanceof Error ? error.message : 'Invalid diagram syntax';
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this._mermaidService = this.std.get(MermaidBlockServiceIdentifier);

    const doc = new Y.Doc();
    this.yText = doc.getText('mermaid');
    this.yText.insert(0, this.codeSignal.value);

    const yTextObserver = () => {
      const text = this.yText.toString();
      this.codeSignal.value = text;

      this._updateHighlightTokens(text);
      this._updatePreview(text).catch(console.error);
    };
    this.yText.observe(yTextObserver);
    this.disposables.add(() => {
      this.yText.unobserve(yTextObserver);
    });

    this.disposables.add(
      effect(() => {
        noop(this.highlightTokens$.value);
        this.richText?.inlineEditor?.render();
      }),
    );

    this.disposables.add(
      this.std.get(ThemeProvider).theme$.subscribe(() => {
        this._updateHighlightTokens(this.yText.toString());
        this._updatePreview(this.yText.toString()).catch(console.error);
      }),
    );

    this.disposables.addFromEvent(this, 'keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        e.stopPropagation();
        this.abortController.abort();
      }
    });

    this.disposables.addFromEvent(this, 'pointerdown', (e) => {
      e.stopPropagation();
    });
    this.disposables.addFromEvent(this, 'pointerup', (e) => {
      e.stopPropagation();
    });

    // Initial preview
    this._updatePreview(this.codeSignal.value).catch(console.error);

    this.updateComplete
      .then(async () => {
        await this.richText?.updateComplete;

        setTimeout(() => {
          this.richText?.inlineEditor?.focusEnd();
        });
      })
      .catch(console.error);
  }

  override render() {
    const previewSvg = this.previewSvg$.value;
    const previewError = this.previewError$.value;

    return html`<div class="mermaid-editor-container">
      <div class="mermaid-editor">
        <div class="mermaid-editor-content">
          <rich-text
            .yText=${this.yText}
            .attributesSchema=${this.inlineManager.getSchema()}
            .attributeRenderer=${this.inlineManager.getRenderer()}
            .verticalScrollContainerGetter=${this._getVerticalScrollContainer}
          ></rich-text>
        </div>
      </div>
      <div class="mermaid-editor-confirm">
        <span @click=${() => this.abortController.abort()}
          >${DoneIcon({
            width: '24',
            height: '24',
          })}</span
        >
      </div>
      <div class="mermaid-editor-preview">
        ${previewError
          ? html`<div class="mermaid-editor-preview-error">${previewError}</div>`
          : previewSvg
            ? html`<div>${unsafeHTML(previewSvg)}</div>`
            : html`<div class="mermaid-editor-preview-empty">Preview will appear here</div>`}
      </div>
      <div class="mermaid-editor-hint">Shift Enter to line break, Enter to confirm</div>
    </div>`;
  }

  @property({ attribute: false })
  accessor abortController!: AbortController;

  @property({ attribute: false })
  accessor codeSignal!: Signal<string>;

  @property({ attribute: false })
  accessor diagramTypeSignal!: Signal<string | null>;

  @property({ attribute: false })
  accessor std!: BlockStdScope;
}
