import { html } from 'lit';
const TriangleRulerPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M20.333 20H3v-2l1.433-1.368.95.95.707-.707-.933-.934 4.644-4.433 1.056 1.056.707-.707-1.04-1.04 4.411-4.21.94.94.707-.708-.923-.922L17.667 4h2.666zm-3.193-2.772v-8.21l-8.21 8.21z" clip-rule="evenodd"/>
  </svg>
`;
export default TriangleRulerPanel;
