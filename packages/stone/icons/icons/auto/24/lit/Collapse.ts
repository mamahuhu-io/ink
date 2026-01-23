import { html } from 'lit';
const Collapse =
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
    <path fill='currentColor' fill-rule="evenodd" d="M7.53 3.47a.75.75 0 0 0-1.06 1.06l5 5a.75.75 0 0 0 1.06 0l5-5a.75.75 0 0 0-1.06-1.06L12 7.94zm0 17.06a.75.75 0 0 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0l5 5a.75.75 0 1 1-1.06 1.06L12 16.06z" clip-rule="evenodd"/>
  </svg>
`;
export default Collapse;
