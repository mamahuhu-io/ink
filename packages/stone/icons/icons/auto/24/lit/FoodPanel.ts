import { html } from 'lit';
const FoodPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.5 8h2L5.247 4.62a.832.832 0 0 0-1.385.924zM11 8H9L7.362 5.544a.832.832 0 0 1 1.385-.923zM5 9a1 1 0 0 0-1 1v1h16v-1a1 1 0 0 0-1-1zm15 3a8 8 0 1 1-16 0z" clip-rule="evenodd"/>
  </svg>
`;
export default FoodPanel;
