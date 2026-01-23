import { html } from 'lit';
const DirectionSign3Panel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M13 2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V4H6.888a1 1 0 0 0-.71.297l-1.483 1.5a1 1 0 0 0 0 1.406l1.482 1.5A1 1 0 0 0 6.888 9H11v2H6.888a1 1 0 0 0-.71.297l-1.483 1.5a1 1 0 0 0 0 1.406l1.482 1.5a1 1 0 0 0 .711.297H11v5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-5h4a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-4V9h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-4z" clip-rule="evenodd"/>
  </svg>
`;
export default DirectionSign3Panel;
