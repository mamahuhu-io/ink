import { html } from 'lit';
const ColorPanel = ({
  width = '1em',
  height = '1em',
  style = '',
}: { width?: string; height?: string; style?: string } = {}) => html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width=${width}
    height=${height}
    fill="none"
    style=${'user-select:none;flex-shrink:0;' + style}
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M18.5 12a6.5 6.5 0 0 1-6.5 6.5v-13a6.5 6.5 0 0 1 6.5 6.5m2 0a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ColorPanel;
