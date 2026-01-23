import type { NoteBlockModel } from '@ink/stone-model';
import { BlockComponent } from '@ink/stone-std';
import { css, html } from 'lit';

export class NoteBlockComponent extends BlockComponent<NoteBlockModel> {
  static override styles = css`
    .ink-note-block-container {
      display: flow-root;
    }
    .ink-note-block-container.selected {
      background-color: var(--ink-hover-color);
    }
  `;

  override connectedCallback() {
    super.connectedCallback();
  }

  override renderBlock() {
    return html`
      <div class="ink-note-block-container">
        <div class="ink-block-children-container">
          ${this.renderChildren(this.model)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-note': NoteBlockComponent;
  }
}
