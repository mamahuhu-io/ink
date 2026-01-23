import { html } from 'lit';
const AlignLeft =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.75 3.25A.75.75 0 0 1 6.5 4v4.031q.12-.03.25-.031h12a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-12a1 1 0 0 1-.25-.031v2.063A1 1 0 0 1 6.75 13h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-6a1 1 0 0 1-.25-.031V20A.75.75 0 0 1 5 20V4a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/>
  </svg>
`;
export default AlignLeft;
