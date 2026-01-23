import { ListBlockComponent } from './list-block.js';

export function effects() {
  customElements.define('ink-list', ListBlockComponent);
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-list': ListBlockComponent;
  }
}
