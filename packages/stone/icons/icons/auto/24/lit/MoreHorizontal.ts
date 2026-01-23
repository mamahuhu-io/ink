import { html } from 'lit';
const MoreHorizontal =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.5 12a1.73 1.73 0 1 0 3.462 0A1.73 1.73 0 0 0 4.5 12m7.5 1.73a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46m5.77 0a1.73 1.73 0 1 1 0-3.46 1.73 1.73 0 0 1 0 3.46" clip-rule="evenodd"/>
  </svg>
`;
export default MoreHorizontal;
