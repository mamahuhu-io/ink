import { InkText } from './nodes/ink-text';

export function effects() {
  customElements.define('ink-text', InkText);
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-text': InkText;
  }
}
