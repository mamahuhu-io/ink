import { html } from 'lit';
const DarkMode =
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
    <path fill='currentColor' fill-rule="evenodd" d="M10.33 3.47a.75.75 0 0 1 .187.748 7.425 7.425 0 0 0 9.265 9.265.75.75 0 0 1 .936.934A8.925 8.925 0 1 1 9.582 3.282a.75.75 0 0 1 .747.188M8.772 5.223a7.425 7.425 0 1 0 10.005 10.004A8.925 8.925 0 0 1 8.772 5.223" clip-rule="evenodd"/>
  </svg>
`;
export default DarkMode;
