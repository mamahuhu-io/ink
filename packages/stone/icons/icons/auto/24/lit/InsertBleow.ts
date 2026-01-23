import { html } from 'lit';
const InsertBleow =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.25 6.5A.75.75 0 0 1 5 5.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75m0 3.5A.75.75 0 0 1 5 9.25h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75M13 12.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zM12.25 17a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75m-6-4a.75.75 0 0 0-1.5 0v3c0 .414.336.75.75.75h2.75v.75a.75.75 0 0 0 1.28.53l1.5-1.5a.75.75 0 0 0 0-1.06l-1.5-1.5a.75.75 0 0 0-1.28.53v.75h-2z" clip-rule="evenodd"/>
  </svg>
`;
export default InsertBleow;
