import { html } from 'lit';
const AlignHorizontalCenter = ({
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
      d="M12 3.25a.75.75 0 0 1 .75.75v4H18a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-5.25v2H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-2.25v4a.75.75 0 0 1-1.5 0v-4H9a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h2.25v-2H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h5.25V4a.75.75 0 0 1 .75-.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default AlignHorizontalCenter;
