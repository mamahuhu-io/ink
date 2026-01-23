import { html } from 'lit';
const MoreVertical =
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
    <path fill='currentColor' fill-rule="evenodd" d="M13.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0M12 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" clip-rule="evenodd"/>
  </svg>
`;
export default MoreVertical;
