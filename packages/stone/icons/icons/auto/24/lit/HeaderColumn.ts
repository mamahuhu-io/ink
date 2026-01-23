import { html } from 'lit';
const HeaderColumn =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5 3.25A2.75 2.75 0 0 0 2.25 6v12A2.75 2.75 0 0 0 5 20.75h14A2.75 2.75 0 0 0 21.75 18V6A2.75 2.75 0 0 0 19 3.25zm4.75 16v-4.5h4.5v4.5zm6 0H19c.69 0 1.25-.56 1.25-1.25v-3.25h-4.5zm0-6h4.5v-3.5h-4.5zm0-5h4.5V6c0-.69-.56-1.25-1.25-1.25h-3.25zm-1.5-3.5v3.5h-4.5v-3.5zm0 5v3.5h-4.5v-3.5z" clip-rule="evenodd"/>
  </svg>
`;
export default HeaderColumn;
