import { html } from 'lit';
const SortDown = ({
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
      d="M9.05 6a.75.75 0 0 0-1.5 0v10.19l-2.72-2.72a.75.75 0 0 0-1.06 1.06l4 4a.75.75 0 0 0 1.06 0l4-4a.75.75 0 1 0-1.06-1.06l-2.72 2.72zm4.95.75h6a.75.75 0 1 0 0-1.5h-6a.75.75 0 0 0 0 1.5m1 4a.75.75 0 0 0 0 1.5h5a.75.75 0 1 0 0-1.5zm5 7h-4a.75.75 0 0 1 0-1.5h4a.75.75 0 1 1 0 1.5"
      clip-rule="evenodd"
    />
  </svg>
`;
export default SortDown;
