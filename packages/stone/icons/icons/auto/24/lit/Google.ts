import { html } from 'lit';
const Google =
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
    <path fill='currentColor' d="M21.56 10.05H12v3.9h5.51A5.848 5.848 0 0 1 6.15 12 5.85 5.85 0 0 1 12 6.15c1.491 0 2.848.563 3.881 1.482l2.758-2.758A9.7 9.7 0 0 0 12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75 9.75-4.366 9.75-9.75c0-.654-.067-1.332-.19-1.95"/>
  </svg>
`;
export default Google;
