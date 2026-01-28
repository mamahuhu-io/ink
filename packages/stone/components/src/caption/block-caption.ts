import { WithDisposable } from '@ink/stone-global/lit';
import type { DocMode } from '@ink/stone-model';
import { stopPropagation } from '@ink/stone-shared/utils';
import type { BlockStdScope } from '@ink/stone-std';
import {
  modelContext,
  ShadowlessElement,
  stdContext,
  storeContext,
  TextSelection,
} from '@ink/stone-std';
import { RANGE_SYNC_EXCLUDE_ATTR } from '@ink/stone-std/inline';
import type { BlockModel, Store } from '@ink/stone-store';
import { Text } from '@ink/stone-store';
import { consume } from '@lit/context';
import { css, html, nothing } from 'lit';
import { query, state } from 'lit/decorators.js';

// i18n translation getter - can be overridden by the application
let i18nGetter: ((key: string, fallback: string) => string) | null = null;

/**
 * Set a custom i18n getter function for caption translations
 */
export function setCaptionI18nGetter(getter: (key: string, fallback: string) => string) {
  i18nGetter = getter;
}

/**
 * Get translated text with fallback
 */
function t(key: string, fallback: string): string {
  if (i18nGetter) {
    return i18nGetter(key, fallback);
  }
  return fallback;
}

export interface BlockCaptionProps {
  caption: string | null | undefined;
}

export class BlockCaptionEditor<
  Model extends BlockModel<BlockCaptionProps> = BlockModel<BlockCaptionProps>,
> extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    .block-caption-editor {
      display: inline-table;
      resize: none;
      width: 100%;
      outline: none;
      border: 0;
      background: transparent;
      color: var(--ink-icon-color);
      font-size: var(--ink-font-sm);
      font-family: inherit;
      text-align: center;
      field-sizing: content;
      padding: 0;
      margin-top: 4px;
    }
    .block-caption-editor::placeholder {
      color: var(--ink-placeholder-color);
    }
  `;

  private _focus = false;

  show = () => {
    this.display = true;
    this.updateComplete.then(() => this.input.focus()).catch(console.error);
  };

  get mode(): DocMode {
    return this.doc.getParent(this.model)?.flavour === 'ink:surface' ? 'edgeless' : 'page';
  }

  private _onCaptionKeydown(event: KeyboardEvent) {
    event.stopPropagation();

    if (this.mode === 'edgeless' || event.isComposing) {
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const doc = this.doc;
      const target = event.target as HTMLInputElement;
      const start = target.selectionStart;
      if (start === null) {
        return;
      }

      const model = this.model;
      const parent = doc.getParent(model);
      if (!parent) {
        return;
      }

      const value = target.value;
      const caption = value.slice(0, start);
      doc.updateBlock(model, { caption });

      const nextBlockText = value.slice(start);
      const index = parent.children.indexOf(model);
      const id = doc.addBlock(
        'ink:paragraph',
        { text: new Text(nextBlockText) },
        parent,
        index + 1,
      );

      const std = this.std;
      std.selection.setGroup('note', [
        std.selection.create(TextSelection, {
          from: { blockId: id, index: 0, length: 0 },
          to: null,
        }),
      ]);
    }
  }

  private _onInputBlur() {
    this._focus = false;
    this.display = !!this.caption?.length;
  }

  private _onInputChange(e: InputEvent) {
    const target = e.target as HTMLInputElement;
    this.caption = target.value;
    this.doc.updateBlock(this.model, {
      caption: this.caption,
    });
  }

  private _onInputFocus() {
    this._focus = true;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    this.setAttribute(RANGE_SYNC_EXCLUDE_ATTR, 'true');

    this.caption = this.model.props.caption;

    this.disposables.add(
      this.model.propsUpdated.subscribe(({ key }) => {
        if (key === 'caption') {
          this.caption = this.model.props.caption;
          if (!this._focus) {
            this.display = !!this.caption?.length;
          }
        }
      }),
    );
  }

  override render() {
    if (!this.display && !this.caption) {
      return nothing;
    }

    return html`<textarea
      .disabled=${this.doc.readonly}
      placeholder="${t('writeCaption', 'Write a caption')}"
      class="block-caption-editor"
      .value=${this.caption ?? ''}
      @input=${this._onInputChange}
      @focus=${this._onInputFocus}
      @blur=${this._onInputBlur}
      @pointerdown=${stopPropagation}
      @click=${stopPropagation}
      @dblclick=${stopPropagation}
      @cut=${stopPropagation}
      @copy=${stopPropagation}
      @paste=${stopPropagation}
      @keydown=${this._onCaptionKeydown}
      @keyup=${stopPropagation}
    ></textarea>`;
  }

  @state()
  accessor caption: string | null | undefined = undefined;

  @state()
  accessor display = false;

  @consume({ context: storeContext })
  accessor doc!: Store;

  @query('.block-caption-editor')
  accessor input!: HTMLInputElement;

  @consume({ context: modelContext })
  accessor model!: Model;

  @consume({ context: stdContext })
  accessor std!: BlockStdScope;
}

declare global {
  interface HTMLElementTagNameMap {
    'block-caption-editor': BlockCaptionEditor;
  }
}
