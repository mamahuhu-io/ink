import { html } from 'lit';
const Square = ({
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
      d="M3.25 3.25h17.5v17.5H3.25zm1.5 1.5v14.5h14.5V4.75z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Square;
