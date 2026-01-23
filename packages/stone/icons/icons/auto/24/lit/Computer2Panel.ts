import { html } from 'lit';
const Computer2Panel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm5.85 1a.65.65 0 0 1 .65-.65h3a.65.65 0 1 1 0 1.3h-3A.65.65 0 0 1 9.85 6M4 17.725a.775.775 0 0 0 0 1.55h16a.775.775 0 0 0 0-1.55z" clip-rule="evenodd"/>
  </svg>
`;
export default Computer2Panel;
