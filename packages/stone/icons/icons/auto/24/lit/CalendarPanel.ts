import { html } from 'lit';
const CalendarPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M18.5 10h-13v8a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5zM4 10V6q0-.207.04-.403A2 2 0 0 1 6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" clip-rule="evenodd"/>
  </svg>
`;
export default CalendarPanel;
