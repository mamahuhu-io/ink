import { InkEmoji } from './emoji-node/ink-emoji';

export function effects() {
  if (!customElements.get('ink-emoji')) {
    customElements.define('ink-emoji', InkEmoji);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-emoji': InkEmoji;
  }
}
