import { html } from 'lit';
const Toc =
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
    <path fill='currentColor' d="M4 5.25a.75.75 0 0 0 0 1.5h15.023a.75.75 0 0 0 0-1.5zM9 9.25a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5zM4.25 14a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75M9 17.25a.75.75 0 0 0 0 1.5h10a.75.75 0 0 0 0-1.5z"/>
  </svg>
`;
export default Toc;
