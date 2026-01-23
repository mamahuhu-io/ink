import { html } from 'lit';
const ArrowShape =
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
    <path fill='currentColor' fill-rule="evenodd" d="M13.345 7.05H3v9.9h10.345V21L21 12l-7.655-9zm1.5.029V8.55H4.5v6.9h10.345v1.471L19.03 12z" clip-rule="evenodd"/>
  </svg>
`;
export default ArrowShape;
