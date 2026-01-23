import { html } from 'lit';
const Diagonally_2Lines =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.707 17.435a1 1 0 1 0 1.414 1.414L18.85 6.121a1 1 0 1 0-1.414-1.414zm7.071 1.414a1 1 0 0 0 1.414 1.414l7.072-7.07a1 1 0 0 0-1.415-1.415z" clip-rule="evenodd"/>
  </svg>
`;
export default Diagonally_2Lines;
