import { ViewDropdownMenu } from './dropdown-menu';

export * from './dropdown-menu';

export function effects() {
  customElements.define('ink-view-dropdown-menu', ViewDropdownMenu);
}
