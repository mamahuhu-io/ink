import { html } from 'lit';
const Grouping =
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
    <path fill='currentColor' fill-rule="evenodd" d="M2.75 6A2.75 2.75 0 0 1 5.5 3.25h13A2.75 2.75 0 0 1 21.25 6v12a2.75 2.75 0 0 1-2.75 2.75h-13A2.75 2.75 0 0 1 2.75 18zm11.5-1.25h-4.5v14.5h4.5zm1.5 14.5V4.75h2.75c.69 0 1.25.56 1.25 1.25v12c0 .69-.56 1.25-1.25 1.25zM5.5 4.75h2.75v14.5H5.5c-.69 0-1.25-.56-1.25-1.25V6c0-.69.56-1.25 1.25-1.25" clip-rule="evenodd"/>
  </svg>
`;
export default Grouping;
