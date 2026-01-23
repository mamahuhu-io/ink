import { html } from 'lit';
const Gt =
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
    <path fill='currentColor' fill-rule="evenodd" d="M17.25 12a.75.75 0 0 1-.442.684l-10 4.5-.616-1.368L14.672 12l-8.48-3.816.616-1.368 10 4.5a.75.75 0 0 1 .442.684" clip-rule="evenodd"/>
  </svg>
`;
export default Gt;
