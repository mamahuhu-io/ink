import { html } from 'lit';
const Other =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.665 2.33a.75.75 0 0 1 .67 0l8 4a.75.75 0 0 1 .415.67v10a.75.75 0 0 1-.415.67l-8 4a.75.75 0 0 1-.67 0l-8-4A.75.75 0 0 1 3.25 17V7a.75.75 0 0 1 .415-.67zM4.75 8.213l6.5 3.25v8.323l-6.5-3.25zm8 11.573 6.5-3.25V8.214l-6.5 3.25zM12 10.162 18.323 7 12 3.839 5.677 7z" clip-rule="evenodd"/>
  </svg>
`;
export default Other;
