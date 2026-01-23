import { html } from 'lit';
const Flag3Panel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M6 4a.5.5 0 0 0-.5.5v16a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-16A.5.5 0 0 0 7 4zm2.5 11.154V5.846a.5.5 0 0 1 .741-.438l8.462 4.654a.5.5 0 0 1 0 .876l-8.462 4.654a.5.5 0 0 1-.741-.438" clip-rule="evenodd"/>
  </svg>
`;
export default Flag3Panel;
