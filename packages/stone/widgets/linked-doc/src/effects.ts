import { INK_LINKED_DOC_WIDGET } from './config.js';
import { InkLinkedDocWidget } from './index.js';
import { LinkedDocPopover } from './linked-doc-popover.js';
import { InkMobileLinkedDocMenu } from './mobile-linked-doc-menu.js';

export function effects() {
  customElements.define('ink-linked-doc-popover', LinkedDocPopover);
  customElements.define(INK_LINKED_DOC_WIDGET, InkLinkedDocWidget);
  customElements.define('ink-mobile-linked-doc-menu', InkMobileLinkedDocMenu);
}
