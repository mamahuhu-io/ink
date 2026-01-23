import { html } from 'lit';
const WalletPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M7.111 4A3.11 3.11 0 0 0 4 7.111v9.333A3.556 3.556 0 0 0 7.556 20h10.666c.982 0 1.778-.796 1.778-1.778v-8c0-.982-.796-1.778-1.778-1.778h-1.778V5.556c0-.86-.696-1.556-1.555-1.556zm7.556 4.444V5.778H7.11a1.333 1.333 0 1 0 0 2.666zm.444 6.89a1.111 1.111 0 1 0 0-2.223 1.111 1.111 0 0 0 0 2.222" clip-rule="evenodd"/>
  </svg>
`;
export default WalletPanel;
