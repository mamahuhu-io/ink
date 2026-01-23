import { InkLink } from './link-node/ink-link';
import { LinkPopup } from './link-node/link-popup/link-popup';

export function effects() {
  customElements.define('link-popup', LinkPopup);
  customElements.define('ink-link', InkLink);
}
