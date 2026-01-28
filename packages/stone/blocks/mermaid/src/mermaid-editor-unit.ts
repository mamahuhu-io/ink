import type { InkTextAttributes } from '@ink/stone-shared/types';
import { ShadowlessElement } from '@ink/stone-std';
import { ZERO_WIDTH_FOR_EMPTY_LINE } from '@ink/stone-std/inline';
import type { DeltaInsert } from '@ink/stone-store';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export class MermaidEditorUnit extends ShadowlessElement {
  get mermaidMenu() {
    return this.closest('mermaid-editor-menu');
  }

  get vElement() {
    return this.closest('v-element');
  }

  override render() {
    const plainContent = html`<span><v-text .str=${this.delta.insert}></v-text></span>`;

    const mermaidMenu = this.mermaidMenu;
    const vElement = this.vElement;
    if (!mermaidMenu || !vElement) {
      return plainContent;
    }

    const lineIndex = this.vElement.lineIndex;
    const tokens = mermaidMenu.highlightTokens$.value[lineIndex] ?? [];
    if (
      tokens.length === 0 ||
      tokens.reduce((acc, token) => acc + token.content, '') !== this.delta.insert
    ) {
      return plainContent;
    }

    return html`<span
      >${tokens.map((token) => {
        return html`<v-text
          .str=${token.content}
          style=${styleMap({
            color: token.color,
          })}
        ></v-text>`;
      })}</span
    >`;
  }

  @property({ attribute: false })
  accessor delta: DeltaInsert<InkTextAttributes> = {
    insert: ZERO_WIDTH_FOR_EMPTY_LINE,
  };
}

declare global {
  interface HTMLElementTagNameMap {
    'mermaid-editor-unit': MermaidEditorUnit;
  }
}
