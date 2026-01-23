import type { InkTextAttributes } from '@ink/stone-shared/types';
import { WithDisposable } from '@ink/stone-global/lit';
import { type BlockStdScope, ShadowlessElement } from '@ink/stone-std';
import {
  ZERO_WIDTH_FOR_EMBED_NODE,
  ZERO_WIDTH_FOR_EMPTY_LINE,
} from '@ink/stone-std/inline';
import type { DeltaInsert } from '@ink/stone-store';
import { css, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit-html/directives/class-map.js';

export class InkEmoji extends WithDisposable(ShadowlessElement) {
  static override styles = css`
    ink-emoji {
      display: inline;
    }

    .emoji-node {
      display: inline;
      user-select: text;
      font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
        'Noto Color Emoji', sans-serif;
      font-size: 1em;
      line-height: 1;
      vertical-align: baseline;
    }

    .emoji-node.selected {
      background: var(--ink-selection-background, rgba(35, 131, 226, 0.14));
      border-radius: 2px;
    }

    .emoji-content {
      padding: 0 1px;
    }
  `;

  get emoji() {
    return this.delta.attributes?.emoji;
  }

  override render() {
    const emoji = this.emoji;
    if (!emoji) {
      return nothing;
    }

    const nodeClasses = classMap({
      'emoji-node': true,
      selected: this.selected,
    });

    return html`<span class=${nodeClasses}
      ><span class="emoji-content">${emoji}</span
      ><v-text .str=${ZERO_WIDTH_FOR_EMBED_NODE}></v-text
    ></span>`;
  }

  @property({ type: Object })
  accessor delta: DeltaInsert<InkTextAttributes> = {
    insert: ZERO_WIDTH_FOR_EMPTY_LINE,
    attributes: {},
  };

  @property({ type: Boolean })
  accessor selected: boolean = false;

  @property({ attribute: false })
  accessor std!: BlockStdScope;
}
