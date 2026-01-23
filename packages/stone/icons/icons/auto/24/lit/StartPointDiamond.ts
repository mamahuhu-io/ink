import { html } from 'lit';
const StartPointDiamond =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.47 8.47a.75.75 0 0 1 1.06 0l2.78 2.78H21a.75.75 0 0 1 0 1.5H9.31l-2.78 2.78a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 0-1.06z" clip-rule="evenodd"/>
  </svg>
`;
export default StartPointDiamond;
