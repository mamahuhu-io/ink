import { INK_SCROLL_ANCHORING_WIDGET, InkScrollAnchoringWidget } from './scroll-anchoring.js';

export function effects() {
  customElements.define(INK_SCROLL_ANCHORING_WIDGET, InkScrollAnchoringWidget);
}

declare global {
  interface HTMLElementTagNameMap {
    [INK_SCROLL_ANCHORING_WIDGET]: InkScrollAnchoringWidget;
  }
}
