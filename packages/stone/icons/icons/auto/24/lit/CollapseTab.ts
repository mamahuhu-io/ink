import { html } from 'lit';
const CollapseTab =
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
    <path fill='currentColor' d="M14.91 5.884a.75.75 0 0 0-.75-.75H4.014a.75.75 0 0 0 0 1.5H14.16a.75.75 0 0 0 .75-.75M14.91 10.196a.75.75 0 0 0-.75-.75H4.014a.75.75 0 0 0 0 1.5H14.16a.75.75 0 0 0 .75-.75M14.16 13.758a.75.75 0 1 1 0 1.5H4.014a.75.75 0 0 1 0-1.5zM9.91 18.82a.75.75 0 0 0-.75-.75H4.06a.75.75 0 0 0 0 1.5H9.16a.75.75 0 0 0 .75-.75M21 10.514v3.597c0 .441-.486.71-.86.476l-2.877-1.798a.562.562 0 0 1 0-.953l2.877-1.798a.562.562 0 0 1 .86.476"/>
  </svg>
`;
export default CollapseTab;
