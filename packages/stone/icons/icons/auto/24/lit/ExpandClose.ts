import { html } from 'lit';
const ExpandClose = ({
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
      d="M20.53 3.47a.75.75 0 0 1 0 1.06l-4.22 4.22h2.19a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0v2.19l4.22-4.22a.75.75 0 0 1 1.06 0M5.5 15.25a.75.75 0 0 1 0-1.5h4a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-2.19l-4.22 4.22a.75.75 0 0 1-1.06-1.06l4.22-4.22z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ExpandClose;
