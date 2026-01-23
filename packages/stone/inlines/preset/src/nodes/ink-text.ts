import { inkTextStyles } from '@ink/stone-shared/styles';
import type { InkTextAttributes } from '@ink/stone-shared/types';
import { ShadowlessElement } from '@ink/stone-std';
import { ZERO_WIDTH_FOR_EMPTY_LINE } from '@ink/stone-std/inline';
import type { DeltaInsert } from '@ink/stone-store';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

export class InkText extends ShadowlessElement {
  override render() {
    const style = this.delta.attributes
      ? inkTextStyles(this.delta.attributes)
      : {};

    // we need to avoid \n appearing before and after the span element, which will
    // cause the unexpected space
    if (this.delta.attributes?.code) {
      return html`<code style=${styleMap(style)}
        ><v-text .str=${this.delta.insert}></v-text
      ></code>`;
    }

    // we need to avoid \n appearing before and after the span element, which will
    // cause the unexpected space
    return html`<span style=${styleMap(style)}
      ><v-text .str=${this.delta.insert}></v-text
    ></span>`;
  }

  @property({ type: Object })
  accessor delta: DeltaInsert<InkTextAttributes> = {
    insert: ZERO_WIDTH_FOR_EMPTY_LINE,
  };
}
