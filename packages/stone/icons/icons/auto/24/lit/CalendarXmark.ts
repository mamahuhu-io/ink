import { html } from 'lit';
const CalendarXmark =
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
    <path fill='currentColor' fill-rule="evenodd" d="M8 2.75a.75.75 0 0 1 .75.75v.75h6.5V3.5a.75.75 0 0 1 1.5 0v.75H19A2.75 2.75 0 0 1 21.75 7v6a.75.75 0 0 1-1.5 0v-2.75H3.75V19c0 .69.56 1.25 1.25 1.25h6.5a.75.75 0 0 1 0 1.5H5A2.75 2.75 0 0 1 2.25 19V7A2.75 2.75 0 0 1 5 4.25h2.25V3.5A.75.75 0 0 1 8 2.75m-.75 3H5c-.69 0-1.25.56-1.25 1.25v1.75h16.5V7c0-.69-.56-1.25-1.25-1.25h-2.25v.75a.75.75 0 0 1-1.5 0v-.75h-6.5v.75a.75.75 0 0 1-1.5 0zm7.341 10.72a.75.75 0 0 1 1.06 0l1.592 1.59 1.59-1.59a.75.75 0 0 1 1.061 1.06l-1.59 1.591 1.59 1.591a.75.75 0 0 1-1.06 1.061l-1.591-1.591-1.591 1.591a.75.75 0 0 1-1.061-1.06l1.591-1.592-1.591-1.59a.75.75 0 0 1 0-1.061" clip-rule="evenodd"/>
  </svg>
`;
export default CalendarXmark;
