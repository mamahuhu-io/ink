import {
  INK_KEYBOARD_TOOLBAR_WIDGET,
  InkKeyboardToolbarWidget,
} from './index.js';
import {
  INK_KEYBOARD_TOOL_PANEL,
  InkKeyboardToolPanel,
} from './keyboard-tool-panel.js';
import {
  INK_KEYBOARD_TOOLBAR,
  InkKeyboardToolbar,
} from './keyboard-toolbar.js';

export function effects() {
  customElements.define(
    INK_KEYBOARD_TOOLBAR_WIDGET,
    InkKeyboardToolbarWidget
  );
  customElements.define(INK_KEYBOARD_TOOLBAR, InkKeyboardToolbar);
  customElements.define(INK_KEYBOARD_TOOL_PANEL, InkKeyboardToolPanel);
}

declare global {
  interface HTMLElementTagNameMap {
    [INK_KEYBOARD_TOOLBAR]: InkKeyboardToolbar;
    [INK_KEYBOARD_TOOL_PANEL]: InkKeyboardToolPanel;
  }
}
