import { html } from 'lit';
const Pined =
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
    <path fill='currentColor' fill-rule="evenodd" d="M17.48 3.692a2.75 2.75 0 0 0-3.889 0L8.262 9.02l-.883-.884a.75.75 0 0 0-1.061 1.06l1.414 1.415 2.298 2.298-4.924 4.925a.75.75 0 1 0 1.06 1.06l4.925-4.924 2.298 2.298 1.414 1.414a.75.75 0 0 0 1.06-1.06l-.883-.884 5.328-5.329a2.75 2.75 0 0 0 0-3.89z" clip-rule="evenodd"/>
  </svg>
`;
export default Pined;
