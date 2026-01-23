import { html } from 'lit';
const RightTab =
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
    <path fill='currentColor' d="M9.09 5.884a.75.75 0 0 1 .75-.75h10.146a.75.75 0 0 1 0 1.5H9.84a.75.75 0 0 1-.75-.75M9.09 10.196a.75.75 0 0 1 .75-.75h10.146a.75.75 0 0 1 0 1.5H9.84a.75.75 0 0 1-.75-.75M9.84 13.758a.75.75 0 0 0 0 1.5h10.146a.75.75 0 0 0 0-1.5zM9.09 18.82a.75.75 0 0 1 .75-.75h5.099a.75.75 0 0 1 0 1.5H9.84a.75.75 0 0 1-.75-.75M3 10.514v3.597c0 .441.486.71.86.476l2.877-1.798a.562.562 0 0 0 0-.953L3.86 10.038a.562.562 0 0 0-.86.476"/>
  </svg>
`;
export default RightTab;
