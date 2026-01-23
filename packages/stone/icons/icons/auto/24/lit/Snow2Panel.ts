import { html } from 'lit';
const Snow2Panel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M3 11.1a3.6 3.6 0 0 0 3.6 3.6h12.15a2.25 2.25 0 1 0-.49-4.446q.04-.247.04-.504a3.15 3.15 0 0 0-2.786-3.13A4.502 4.502 0 0 0 6.6 7.5 3.6 3.6 0 0 0 3 11.1M8 17a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m6-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-8 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m6-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0M5 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2" clip-rule="evenodd"/>
  </svg>
`;
export default Snow2Panel;
