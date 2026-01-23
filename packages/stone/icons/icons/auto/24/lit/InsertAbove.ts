import { html } from 'lit';
const InsertAbove =
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
    <path fill='currentColor' fill-rule="evenodd" d="M9.5 6.75a.75.75 0 0 0 0 1.5h1.75V10a.75.75 0 0 0 1.5 0V8.25h1.75a.75.75 0 0 0 0-1.5h-1.75V5a.75.75 0 0 0-1.5 0v1.75zM3.75 18c0 .966.784 1.75 1.75 1.75h13A1.75 1.75 0 0 0 20.25 18v-4a1.75 1.75 0 0 0-1.75-1.75h-13A1.75 1.75 0 0 0 3.75 14zm1.75.25a.25.25 0 0 1-.25-.25v-4a.25.25 0 0 1 .25-.25h13a.25.25 0 0 1 .25.25v4a.25.25 0 0 1-.25.25z" clip-rule="evenodd"/>
  </svg>
`;
export default InsertAbove;
