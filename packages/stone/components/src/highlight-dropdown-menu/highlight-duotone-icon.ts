import { HighLightDuotoneIcon } from '@ink/stone-icons/lit';
import { css, LitElement } from 'lit';

export class HighlightDuotoneIcon extends LitElement {
  static override styles = css`
    svg {
      display: flex;
      font-size: 20px;
    }
    svg > path:nth-child(1) {
      fill: var(--color, unset);
    }
  `;
  override render() {
    return HighLightDuotoneIcon();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ink-highlight-duotone-icon': HighlightDuotoneIcon;
  }
}
