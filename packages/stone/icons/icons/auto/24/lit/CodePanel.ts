import { html } from 'lit';
const CodePanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm1.416 8.376a.75.75 0 1 0-.832 1.248L8.648 15l-2.064 1.376a.75.75 0 1 0 .832 1.248l3-2a.75.75 0 0 0 0-1.248z" clip-rule="evenodd"/>
  </svg>
`;
export default CodePanel;
