import { html } from 'lit';
const SkirtPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.914 5a.2.2 0 0 0-.2.2v2.171c0 .11.09.2.2.2h13.6a.2.2 0 0 0 .2-.2V5.2a.2.2 0 0 0-.2-.2zm.01 3.429h13.72a.2.2 0 0 1 .195.158L21 18.714a28.46 28.46 0 0 1-18 0l1.728-10.12a.2.2 0 0 1 .197-.165" clip-rule="evenodd"/>
  </svg>
`;
export default SkirtPanel;
