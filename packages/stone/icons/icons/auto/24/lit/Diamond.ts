import { html } from 'lit';
const Diamond = ({
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
      d="M12 1.94 22.06 12 12 22.06 1.94 12zM4.06 12 12 19.94 19.94 12 12 4.06z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Diamond;
