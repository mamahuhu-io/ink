import { INK_SLASH_MENU_WIDGET } from './consts';
import { SlashMenuLinkPopup } from './slash-menu-link-popup';
import { InnerSlashMenu, SlashMenu } from './slash-menu-popover';
import { InkSlashMenuWidget } from './widget';

export function effects() {
  customElements.define(INK_SLASH_MENU_WIDGET, InkSlashMenuWidget);
  customElements.define('ink-slash-menu', SlashMenu);
  customElements.define('inner-slash-menu', InnerSlashMenu);
  customElements.define('slash-menu-link-popup', SlashMenuLinkPopup);
}

declare global {
  interface HTMLElementTagNameMap {
    [INK_SLASH_MENU_WIDGET]: InkSlashMenuWidget;
  }
}
