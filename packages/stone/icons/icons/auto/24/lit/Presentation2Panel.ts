import { html } from 'lit';
const Presentation2Panel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4 5.25a.75.75 0 0 0 0 1.5h1V16a1 1 0 0 0 1 1h4.229l-1.71 1.424a.75.75 0 0 0 .961 1.152l2.52-2.1 2.52 2.1a.75.75 0 0 0 .96-1.152L13.771 17H18a1 1 0 0 0 1-1V6.75h1a.75.75 0 0 0 0-1.5zM11.5 8a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm-3 3a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5zm5.5-.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" clip-rule="evenodd"/>
  </svg>
`;
export default Presentation2Panel;
