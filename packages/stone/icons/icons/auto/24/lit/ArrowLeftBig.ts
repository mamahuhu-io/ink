import { html } from 'lit';
const ArrowLeftBig =
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
    <path fill='currentColor' fill-rule="evenodd" d="M10.997 6.493a.75.75 0 0 1-.045 1.06L6.925 11.25H19a.75.75 0 0 1 0 1.5H6.925l4.027 3.698a.75.75 0 1 1-1.015 1.104l-5.444-5a.75.75 0 0 1 0-1.104l5.444-5a.75.75 0 0 1 1.06.045" clip-rule="evenodd"/>
  </svg>
`;
export default ArrowLeftBig;
