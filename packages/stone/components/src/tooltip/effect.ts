import { Tooltip } from './tooltip.js';

export function effects() {
  if (!customElements.get('ink-tooltip')) {
    customElements.define('ink-tooltip', Tooltip);
  }
}
