import { html } from 'lit';
const FlashPanel =
  ({ width = '1em', height = '1em', style = '' }: { width?: string, height?: string, style?: string } = {}) =>
    html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width=${width}
    height=${height}
    fill="none"
    style=${'user-select:none;flex-shrink:0;' + style}
  >
    <path fill='currentColor' d="M16.08 3H8.873c-.446 0-.841.285-.981.708L4.95 12.586a1.033 1.033 0 0 0 .981 1.358H9.2l-1.122 6.96c-.082.509.549.811.894.429l9.474-10.509c.599-.665.127-1.725-.768-1.725h-3.53l2.81-4.52A1.033 1.033 0 0 0 16.079 3"/>
  </svg>
`;
export default FlashPanel;
