import { html } from 'lit';
const ChemicalPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M16 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8m-5 .5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m7 5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" clip-rule="evenodd"/>
  </svg>
`;
export default ChemicalPanel;
