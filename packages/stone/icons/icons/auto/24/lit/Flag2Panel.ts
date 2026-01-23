import { html } from 'lit';
const Flag2Panel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.5 4a.5.5 0 0 0-.5.5v16a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-16a.5.5 0 0 0-.5-.5zm3 1a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9.762a.5.5 0 0 0 .464-.686l-1.652-4.128a.5.5 0 0 1 0-.372l1.652-4.128A.5.5 0 0 0 18.262 5z" clip-rule="evenodd"/>
  </svg>
`;
export default Flag2Panel;
