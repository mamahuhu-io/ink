import { html } from 'lit';
const Filtered =
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
    <path fill='currentColor' fill-rule="evenodd" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M8 8.75a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm1 3a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zm1.25 3.75a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/>
  </svg>
`;
export default Filtered;
