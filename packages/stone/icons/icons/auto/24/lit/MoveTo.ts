import { html } from 'lit';
const MoveTo =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.25 4A.75.75 0 0 1 5 3.25h14a.75.75 0 0 1 .75.75v16a.75.75 0 0 1-.75.75H5a.75.75 0 0 1-.75-.75v-3a.75.75 0 0 1 1.5 0v2.25h12.5V4.75H5.75V7.5a.75.75 0 0 1-1.5 0zm8 4a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H13a.75.75 0 0 1-.75-.75m.75 2.75a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zM12.25 15a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75M8.03 8.47a.75.75 0 0 0-1.06 1.06l1.72 1.72H2.5a.75.75 0 0 0 0 1.5h6.19l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06z" clip-rule="evenodd"/>
  </svg>
`;
export default MoveTo;
