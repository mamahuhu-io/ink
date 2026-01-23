import { html } from 'lit';
const TextAlignTop =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.25 6A.75.75 0 0 1 5 5.25h14a.75.75 0 0 1 0 1.5H5A.75.75 0 0 1 4.25 6M4.25 10A.75.75 0 0 1 5 9.25h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/>
  </svg>
`;
export default TextAlignTop;
