import { html } from 'lit';
const ImagePanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M18 5.5H6a.5.5 0 0 0-.5.5v8.083l1.798-1.498a1 1 0 0 1 1.348.06L10.5 14.5l3.886-3.023a1 1 0 0 1 1.228 0l2.886 2.245V6a.5.5 0 0 0-.5-.5M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm2.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" clip-rule="evenodd"/>
  </svg>
`;
export default ImagePanel;
