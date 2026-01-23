import { HighlightDropdownMenu } from './dropdown-menu';
import { HighlightDuotoneIcon } from './highlight-duotone-icon';
import { TextDuotoneIcon } from './text-duotone-icon';

export * from './dropdown-menu';
export * from './highlight-duotone-icon';
export * from './text-duotone-icon';

export function effects() {
  customElements.define(
    'ink-highlight-dropdown-menu',
    HighlightDropdownMenu
  );
  customElements.define('ink-highlight-duotone-icon', HighlightDuotoneIcon);
  customElements.define('ink-text-duotone-icon', TextDuotoneIcon);
}
