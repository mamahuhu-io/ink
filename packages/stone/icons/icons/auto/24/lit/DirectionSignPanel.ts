import { html } from 'lit';
const DirectionSignPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M12 2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V5H6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h4v8a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-8h3.972a1 1 0 0 0 .85-.475l1.853-3a1 1 0 0 0 0-1.05l-1.852-3A1 1 0 0 0 15.972 5H12z" clip-rule="evenodd"/>
  </svg>
`;
export default DirectionSignPanel;
