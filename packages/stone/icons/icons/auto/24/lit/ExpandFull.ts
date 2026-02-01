import { html } from 'lit';
const ExpandFull = ({
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
      d="M15.25 4a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0V5.81l-4.22 4.22a.75.75 0 1 1-1.06-1.06l4.22-4.22H16a.75.75 0 0 1-.75-.75m-5.22 9.97a.75.75 0 0 1 0 1.06l-4.22 4.22H8a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0v2.19l4.22-4.22a.75.75 0 0 1 1.06 0"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ExpandFull;
