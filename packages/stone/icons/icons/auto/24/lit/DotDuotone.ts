import { html } from 'lit';
const DotDuotone =
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
    <path fill="#F43F48" d="M19 12a7 7 0 1 1-14 0 7 7 0 0 1 14 0"/>
  </svg>
`;
export default DotDuotone;
