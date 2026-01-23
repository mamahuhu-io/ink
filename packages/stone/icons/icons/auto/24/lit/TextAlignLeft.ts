import { html } from 'lit';
const TextAlignLeft =
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
    <path fill='currentColor' fill-rule="evenodd" d="M20.75 6a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 .75-.75m-7 6a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 .75-.75m3 6a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 .75-.75" clip-rule="evenodd"/>
  </svg>
`;
export default TextAlignLeft;
