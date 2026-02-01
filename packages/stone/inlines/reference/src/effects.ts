import { InkReference, ReferencePopup } from './reference-node';

export function effects() {
  customElements.define('reference-popup', ReferencePopup);
  customElements.define('ink-reference', InkReference);
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-reference': InkReference;
    'reference-popup': ReferencePopup;
  }
}
