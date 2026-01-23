import { html } from 'lit';
const Ne =
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
    <path fill='currentColor' fill-rule="evenodd" d="m9.488 15.75-1.164 2.425 1.352.65 1.476-3.075H17.5v-1.5h-5.628l1.92-4H17.5v-1.5h-2.988l1.164-2.425-1.352-.65-1.476 3.075H6.5v1.5h5.628l-1.92 4H6.5v1.5z" clip-rule="evenodd"/>
  </svg>
`;
export default Ne;
