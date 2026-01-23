import { html } from 'lit';
const InsertBelow =
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
    <path fill='currentColor' fill-rule="evenodd" d="M20.25 6a1.75 1.75 0 0 0-1.75-1.75h-13A1.75 1.75 0 0 0 3.75 6v4c0 .966.784 1.75 1.75 1.75h13A1.75 1.75 0 0 0 20.25 10zm-1.75-.25a.25.25 0 0 1 .25.25v4a.25.25 0 0 1-.25.25h-13a.25.25 0 0 1-.25-.25V6a.25.25 0 0 1 .25-.25zm-4 11.5a.75.75 0 0 0 0-1.5h-1.75V14a.75.75 0 0 0-1.5 0v1.75H9.5a.75.75 0 0 0 0 1.5h1.75V19a.75.75 0 0 0 1.5 0v-1.75z" clip-rule="evenodd"/>
  </svg>
`;
export default InsertBelow;
