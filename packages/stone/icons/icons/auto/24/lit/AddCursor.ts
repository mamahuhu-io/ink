import { html } from 'lit';
const AddCursor =
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
    <path stroke='currentColor' stroke-linecap="round" stroke-linejoin="round" d="M6 12h12m-6-6v12"/>
  </svg>
`;
export default AddCursor;
