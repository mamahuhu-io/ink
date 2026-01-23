import { html } from 'lit';
const AlignVerticalCenter =
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
    <path fill='currentColor' fill-rule="evenodd" d="M15 5a1 1 0 0 1 1 1v5.25h4a.75.75 0 0 1 0 1.5h-4V18a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-5.25h-2V15a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.25H4a.75.75 0 0 1 0-1.5h4V9a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2.25h2V6a1 1 0 0 1 1-1z" clip-rule="evenodd"/>
  </svg>
`;
export default AlignVerticalCenter;
