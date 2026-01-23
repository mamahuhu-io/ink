import { html } from 'lit';
const RightSidebar =
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
    <path fill='currentColor' fill-rule="evenodd" d="M15.25 6h3.25a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-3.25zm-1.5 0H5.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h8.25zM3.5 6.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z" clip-rule="evenodd"/>
  </svg>
`;
export default RightSidebar;
