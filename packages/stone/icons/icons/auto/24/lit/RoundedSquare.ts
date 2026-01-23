import { html } from 'lit';
const RoundedSquare =
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
    <path fill='currentColor' fill-rule="evenodd" d="M3.25 6A2.75 2.75 0 0 1 6 3.25h12A2.75 2.75 0 0 1 20.75 6v12A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18zM6 4.75c-.69 0-1.25.56-1.25 1.25v12c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25V6c0-.69-.56-1.25-1.25-1.25z" clip-rule="evenodd"/>
  </svg>
`;
export default RoundedSquare;
