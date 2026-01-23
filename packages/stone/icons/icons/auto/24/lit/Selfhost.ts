import { html } from 'lit';
const Selfhost =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.25 5.063h13.5a.75.75 0 0 1 .75.75v3.375a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75V5.812a.75.75 0 0 1 .75-.75M3 5.813a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 5.813v3.375a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 9.188zm2.25 8.25h13.5a.75.75 0 0 1 .75.75v3.374a.75.75 0 0 1-.75.75H5.25a.75.75 0 0 1-.75-.75v-3.375a.75.75 0 0 1 .75-.75m-2.25.75a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v3.374a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18.188zM6.75 16.5a.75.75 0 0 1 .75-.75h2.813a.75.75 0 0 1 0 1.5H7.5a.75.75 0 0 1-.75-.75m.75-9.75a.75.75 0 0 0 0 1.5h2.813a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/>
  </svg>
`;
export default Selfhost;
