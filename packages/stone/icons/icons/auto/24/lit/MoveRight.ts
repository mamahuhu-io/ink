import { html } from 'lit';
const MoveRight =
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
    <path fill='currentColor' fill-rule="evenodd" d="M20.75 4a.75.75 0 0 0-1.5 0v16a.75.75 0 0 0 1.5 0zm-9.905 4.57a.75.75 0 1 1 .976-1.14l4.667 4a.75.75 0 0 1 0 1.14l-4.667 4a.75.75 0 1 1-.976-1.14l3.128-2.68H4a.75.75 0 0 1 0-1.5h9.973z" clip-rule="evenodd"/>
  </svg>
`;
export default MoveRight;
