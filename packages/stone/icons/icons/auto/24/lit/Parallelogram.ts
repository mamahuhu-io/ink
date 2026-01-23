import { html } from 'lit';
const Parallelogram =
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
    <path fill='currentColor' fill-rule="evenodd" d="m8.276 5.5-4.213 13h11.661l4.213-13zM7.186 4 2 20h14.815L22 4z" clip-rule="evenodd"/>
  </svg>
`;
export default Parallelogram;
