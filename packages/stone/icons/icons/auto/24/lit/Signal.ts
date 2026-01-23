import { html } from 'lit';
const Signal =
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
    <path fill='currentColor' fill-rule="evenodd" d="M18.5 6.5h-13v6.119l6.5 4.55 6.5-4.55zm1.5 6.9L12 19l-8-5.6V5h16z" clip-rule="evenodd"/>
  </svg>
`;
export default Signal;
