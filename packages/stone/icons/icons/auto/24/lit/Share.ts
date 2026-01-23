import { html } from 'lit';
const Share =
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
    <path fill='currentColor' fill-rule="evenodd" d="M18 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M14.25 6a3.75 3.75 0 1 1 .799 2.314l-5.427 2.713a3.75 3.75 0 0 1 0 1.946l5.427 2.713a3.75 3.75 0 1 1-.671 1.341L8.95 14.314a3.75 3.75 0 1 1 0-4.628l5.427-2.713A3.8 3.8 0 0 1 14.25 6M6 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5m12 6a2.25 2.25 0 1 0-.002 4.5 2.25 2.25 0 0 0 .002-4.5" clip-rule="evenodd"/>
  </svg>
`;
export default Share;
