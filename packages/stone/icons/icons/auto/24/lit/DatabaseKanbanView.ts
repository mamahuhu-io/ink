import { html } from 'lit';
const DatabaseKanbanView =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.5 3.75A1.75 1.75 0 0 0 3.75 5.5V18c0 .966.784 1.75 1.75 1.75h4A1.75 1.75 0 0 0 11.25 18V5.5A1.75 1.75 0 0 0 9.5 3.75zM5.25 5.5a.25.25 0 0 1 .25-.25h4a.25.25 0 0 1 .25.25V18a.25.25 0 0 1-.25.25h-4a.25.25 0 0 1-.25-.25zM14.5 3.75a1.75 1.75 0 0 0-1.75 1.75v7c0 .966.784 1.75 1.75 1.75h4a1.75 1.75 0 0 0 1.75-1.75v-7a1.75 1.75 0 0 0-1.75-1.75zm-.25 1.75a.25.25 0 0 1 .25-.25h4a.25.25 0 0 1 .25.25v7a.25.25 0 0 1-.25.25h-4a.25.25 0 0 1-.25-.25z" clip-rule="evenodd"/>
  </svg>
`;
export default DatabaseKanbanView;
