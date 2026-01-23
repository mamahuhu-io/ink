import { html } from 'lit';
const CloudyPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M2 14a4 4 0 0 0 4 4h13.5a2.5 2.5 0 1 0-.544-4.94q.044-.275.044-.56a3.5 3.5 0 0 0-3.095-3.477A5.002 5.002 0 0 0 6 10a4 4 0 0 0-4 4" clip-rule="evenodd"/>
  </svg>
`;
export default CloudyPanel;
