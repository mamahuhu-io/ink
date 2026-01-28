import { html } from 'lit';
const AlignTop = ({
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
      d="M3 5.75A.75.75 0 0 1 3.75 5h16a.75.75 0 0 1 0 1.5h-4.031a1 1 0 0 1 .031.25v12a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-12a1 1 0 0 1 .031-.25H10.72a1 1 0 0 1 .031.25v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-6q0-.13.032-.25H3.75A.75.75 0 0 1 3 5.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default AlignTop;
