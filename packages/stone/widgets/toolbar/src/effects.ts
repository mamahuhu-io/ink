import { INK_TOOLBAR_WIDGET, InkToolbarWidget } from './toolbar';

export function effects() {
  customElements.define(INK_TOOLBAR_WIDGET, InkToolbarWidget);
}

declare global {
  interface HTMLElementTagNameMap {
    [INK_TOOLBAR_WIDGET]: InkToolbarWidget;
  }
}
