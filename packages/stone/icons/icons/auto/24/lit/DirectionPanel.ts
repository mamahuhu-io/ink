import { html } from 'lit';
const DirectionPanel =
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
    <path fill='currentColor' d="M19.915 5.294c.431-1.358-.85-2.639-2.208-2.207L3.544 7.585c-1.68.534-1.617 2.932.089 3.377l6.667 1.74 1.74 6.667c.444 1.705 2.842 1.768 3.376.088z"/>
  </svg>
`;
export default DirectionPanel;
