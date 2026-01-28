import { html } from 'lit';
const ArrowUpBigTop = ({
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
      d="M5 3.25a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5zM12.75 20a.75.75 0 0 1-1.5 0V9.81l-2.72 2.72a.75.75 0 0 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06l-2.72-2.72z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ArrowUpBigTop;
