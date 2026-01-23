import { html } from 'lit';
const Timeline =
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
    <path fill='currentColor' fill-rule="evenodd" d="M7.25 7A2.75 2.75 0 0 1 10 4.25h3a.75.75 0 0 1 0 1.5h-3c-.69 0-1.25.56-1.25 1.25v4.25h6.5V7A2.75 2.75 0 0 1 18 4.25h3a.75.75 0 0 1 0 1.5h-3c-.69 0-1.25.56-1.25 1.25v4.25H21a.75.75 0 0 1 0 1.5h-7.25V17c0 .69.56 1.25 1.25 1.25h3a.75.75 0 0 1 0 1.5h-3A2.75 2.75 0 0 1 12.25 17v-4.25H3a.75.75 0 0 1 0-1.5h4.25z" clip-rule="evenodd"/>
  </svg>
`;
export default Timeline;
