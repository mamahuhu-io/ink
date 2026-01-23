import { html } from 'lit';
const SuitcasePanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.111 4.778a.89.89 0 0 0-.889.889h3.556a.89.89 0 0 0-.89-.89zm4.445.889A2.667 2.667 0 0 0 12.889 3H11.11a2.667 2.667 0 0 0-2.667 2.667H6.667A2.667 2.667 0 0 0 4 8.333v8.89a2.667 2.667 0 0 0 2.667 2.666.889.889 0 0 0 1.777 0h7.112a.889.889 0 1 0 1.777 0A2.667 2.667 0 0 0 20 17.222V8.333a2.667 2.667 0 0 0-2.667-2.666zM9.333 9.222c.491 0 .89.398.89.89v5.332a.889.889 0 1 1-1.779 0v-5.333c0-.49.398-.889.89-.889m5.334 0c.49 0 .889.398.889.89v5.332a.889.889 0 1 1-1.778 0v-5.333c0-.49.398-.889.889-.889" clip-rule="evenodd"/>
  </svg>
`;
export default SuitcasePanel;
