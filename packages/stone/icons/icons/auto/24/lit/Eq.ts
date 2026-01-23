import { html } from 'lit';
const Eq =
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
    <path fill='currentColor' fill-rule="evenodd" d="M6.5 10.25h11v-1.5h-11zm0 5.5h11v-1.5h-11z" clip-rule="evenodd"/>
  </svg>
`;
export default Eq;
