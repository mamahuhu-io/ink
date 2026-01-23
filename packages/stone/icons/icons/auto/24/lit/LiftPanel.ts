import { html } from 'lit';
const LiftPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5 6.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v4h8v-4a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V9h1.5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5H19v2.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-4H8v4a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5V15H3.5a.5.5 0 0 1-.5-.5v-5a.5.5 0 0 1 .5-.5H5z" clip-rule="evenodd"/>
  </svg>
`;
export default LiftPanel;
