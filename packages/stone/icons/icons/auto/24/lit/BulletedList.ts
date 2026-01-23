import { html } from 'lit';
const BulletedList =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.3 7.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m4.033-1.75a.75.75 0 0 0 0 1.5l11.917.001a.75.75 0 0 0 0-1.5zm0 5.5a.75.75 0 1 0 0 1.5l11.917.002a.75.75 0 1 0 0-1.5zm0 5.5a.75.75 0 1 0 0 1.5l11.917.002a.75.75 0 0 0 0-1.5zM5.3 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-1 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2" clip-rule="evenodd"/>
  </svg>
`;
export default BulletedList;
