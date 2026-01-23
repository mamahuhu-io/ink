import { html } from 'lit';
const FilePanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M6.882 4C5.842 4 5 4.843 5 5.882v12.236C5 19.158 5.843 20 6.882 20h9.412c1.04 0 1.883-.843 1.883-1.882V9.882H13V4H6.882m7.65.333 3.43 4.116a.157.157 0 0 1-.12.257h-3.587V4.433c0-.146.183-.213.277-.1" clip-rule="evenodd"/>
  </svg>
`;
export default FilePanel;
