import { html } from 'lit';
const Caption =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.25 7A2.75 2.75 0 0 1 7 4.25h5A2.75 2.75 0 0 1 14.75 7v3A2.75 2.75 0 0 1 12 12.75H7A2.75 2.75 0 0 1 4.25 10zM7 5.75c-.69 0-1.25.56-1.25 1.25v3c0 .69.56 1.25 1.25 1.25h5c.69 0 1.25-.56 1.25-1.25V7c0-.69-.56-1.25-1.25-1.25zM4.25 15.5a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75M5 18.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/>
  </svg>
`;
export default Caption;
