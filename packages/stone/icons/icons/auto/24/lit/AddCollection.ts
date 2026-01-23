import { html } from 'lit';
const AddCollection =
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
    <path fill='currentColor' d="M8.25 4A.75.75 0 0 1 9 3.25h6a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 4M7 6.25a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zM7 9.25A2.75 2.75 0 0 0 4.25 12v5A2.75 2.75 0 0 0 7 19.75h5.25a.75.75 0 0 0 0-1.5H7c-.69 0-1.25-.56-1.25-1.25v-5c0-.69.56-1.25 1.25-1.25h10c.69 0 1.25.56 1.25 1.25v.14a.75.75 0 0 0 1.5 0V12A2.75 2.75 0 0 0 17 9.25zM19.5 15.75a.75.75 0 0 0-1.5 0V18h-2.25a.75.75 0 0 0 0 1.5H18v2.25a.75.75 0 0 0 1.5 0V19.5h2.25a.75.75 0 0 0 0-1.5H19.5z"/>
  </svg>
`;
export default AddCollection;
