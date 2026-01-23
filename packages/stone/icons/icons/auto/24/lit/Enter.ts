import { html } from 'lit';
const Enter =
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
    <path fill='currentColor' fill-rule="evenodd" d="M13.5 5a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-.75.75H6.547l3.352 3.39a.75.75 0 1 1-1.067 1.054l-4.615-4.667a.75.75 0 0 1 0-1.054l4.615-4.667A.75.75 0 0 1 9.9 9.36L6.547 12.75H18v-7h-3.75A.75.75 0 0 1 13.5 5" clip-rule="evenodd"/>
  </svg>
`;
export default Enter;
