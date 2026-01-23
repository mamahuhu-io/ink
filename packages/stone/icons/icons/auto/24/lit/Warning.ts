import { html } from 'lit';
const Warning =
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
    <path fill='currentColor' fill-rule="evenodd" d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5M3.25 12a8.75 8.75 0 1 1 17.5 0 8.75 8.75 0 0 1-17.5 0M12 7.694a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-1.5 0V8.444a.75.75 0 0 1 .75-.75m-.75 7.862a.75.75 0 0 1 .75-.75h.009a.75.75 0 1 1 0 1.5H12a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/>
  </svg>
`;
export default Warning;
