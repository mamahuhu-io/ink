import { html } from 'lit';
const SoloView =
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
    <path fill='currentColor' d="M5.75 4.25A.75.75 0 0 0 5 5v3a.75.75 0 0 0 1.5 0V5.75h2.25a.75.75 0 0 0 0-1.5zM5.75 19.75A.75.75 0 0 1 5 19v-3a.75.75 0 0 1 1.5 0v2.25h2.25a.75.75 0 0 1 0 1.5zM19.5 5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0 0 1.5H18V8a.75.75 0 0 0 1.5 0zM18.75 19.75a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-1.5 0v2.25h-2.25a.75.75 0 0 0 0 1.5z"/>
  </svg>
`;
export default SoloView;
