import { html } from 'lit';
const EmbedWeb =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5 3.25A2.75 2.75 0 0 0 2.25 6v12A2.75 2.75 0 0 0 5 20.75h14A2.75 2.75 0 0 0 21.75 18V6A2.75 2.75 0 0 0 19 3.25zm15.25 5V6c0-.69-.56-1.25-1.25-1.25H5c-.69 0-1.25.56-1.25 1.25v2.25zm-16.5 1.5h16.5V18c0 .69-.56 1.25-1.25 1.25H5c-.69 0-1.25-.56-1.25-1.25zm6.78 3.28a.75.75 0 1 0-1.06-1.06L7.348 14.09a.75.75 0 0 0 0 1.06l2.122 2.122a.75.75 0 1 0 1.06-1.06L8.94 14.62zm2.94-1.06a.75.75 0 0 0 0 1.06l1.59 1.591-1.59 1.591a.75.75 0 0 0 1.06 1.061l2.122-2.121a.75.75 0 0 0 0-1.06L14.53 11.97a.75.75 0 0 0-1.06 0M6.5 6.55a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5" clip-rule="evenodd"/>
  </svg>
`;
export default EmbedWeb;
