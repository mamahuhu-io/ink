import { html } from 'lit';
const Block =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.7 2.813a.75.75 0 0 1 .6 0l8 3.5c.274.12.45.389.45.687v10a.75.75 0 0 1-.45.687l-8 3.5a.75.75 0 0 1-.6 0l-8-3.5A.75.75 0 0 1 3.25 17V7a.75.75 0 0 1 .45-.687zM4.75 8.147v8.362l6.5 2.844v-8.362zm8 2.844v8.362l6.5-2.844V8.147zM18.129 7 12 9.681 5.871 7 12 4.319z" clip-rule="evenodd"/>
  </svg>
`;
export default Block;
