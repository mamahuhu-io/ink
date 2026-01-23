import { html } from 'lit';
const SplitView =
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
    <path fill='currentColor' d="M19.25 6c0-.69-.56-1.25-1.25-1.25h-5.25v14.5H18c.69 0 1.25-.56 1.25-1.25zM4.75 18c0 .69.56 1.25 1.25 1.25h5.25V4.75H6c-.69 0-1.25.56-1.25 1.25zm16 0A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18V6A2.75 2.75 0 0 1 6 3.25h12A2.75 2.75 0 0 1 20.75 6z"/>
  </svg>
`;
export default SplitView;
