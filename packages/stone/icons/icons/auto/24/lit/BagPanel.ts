import { html } from 'lit';
const BagPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.8 2.25A3.25 3.25 0 0 0 8.55 5.5v1h-.794a1.5 1.5 0 0 0-1.477 1.236l-1.964 11A1.5 1.5 0 0 0 5.792 20.5h11.917a1.5 1.5 0 0 0 1.476-1.764l-1.964-11A1.5 1.5 0 0 0 15.744 6.5h-.694v-1a3.25 3.25 0 0 0-3.25-3.25m1.75 4.25v-1a1.75 1.75 0 1 0-3.5 0v1z" clip-rule="evenodd"/>
  </svg>
`;
export default BagPanel;
