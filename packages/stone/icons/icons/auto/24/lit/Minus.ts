import { html } from 'lit';
const Minus = ({
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
      d="M4.5 12c0-.46.373-.833.833-.833h13.334a.833.833 0 0 1 0 1.666H5.333A.833.833 0 0 1 4.5 12"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Minus;
