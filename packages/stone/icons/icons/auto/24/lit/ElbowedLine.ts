import { html } from 'lit';
const ElbowedLine =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.25 7A2.75 2.75 0 0 1 14 4.25h7a.75.75 0 0 1 0 1.5h-7c-.69 0-1.25.56-1.25 1.25v10A2.75 2.75 0 0 1 10 19.75H3a.75.75 0 0 1 0-1.5h7c.69 0 1.25-.56 1.25-1.25z" clip-rule="evenodd"/>
  </svg>
`;
export default ElbowedLine;
