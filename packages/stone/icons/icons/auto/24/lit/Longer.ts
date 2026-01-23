import { html } from 'lit';
const Longer =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5 5.75a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5zm0 3.5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5zm-.75 4.25a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75M5 16.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/>
  </svg>
`;
export default Longer;
