import { html } from 'lit';
const Explain = ({
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
      d="M5 5.25a.75.75 0 0 0-.75.75v12c0 .414.336.75.75.75h2a.75.75 0 0 0 0-1.5H5.75V6.75H7a.75.75 0 0 0 0-1.5zm14 0a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-.75.75h-2a.75.75 0 0 1 0-1.5h1.25V6.75H17a.75.75 0 0 1 0-1.5z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Explain;
