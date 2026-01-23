import { html } from 'lit';
const Grid =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.5 5.5a1 1 0 0 1 1-1H7a1 1 0 0 1 1 1V7a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1zm0 12a1 1 0 0 1 1-1H7a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1zm6 0a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1zm7-1a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1zm-6-12a1 1 0 0 0-1 1V7a1 1 0 0 0 1 1H13a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1zm5 1a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1V7a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1zm-11 5a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1H7a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1zm5 1a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1zm7-1a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1z" clip-rule="evenodd"/>
  </svg>
`;
export default Grid;
