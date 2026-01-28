import { html } from 'lit';
const Property = ({
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
      d="M3.5 6.25a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zm0 5a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zM2.75 17a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75M9 6.25a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 16.25a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Property;
