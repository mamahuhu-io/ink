import { html } from 'lit';
const FlagPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.5 4a.5.5 0 0 0-.5.5v16a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-16a.5.5 0 0 0-.5-.5zm3 1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" clip-rule="evenodd"/>
  </svg>
`;
export default FlagPanel;
