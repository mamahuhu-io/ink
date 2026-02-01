import { html } from 'lit';
const Folder2Panel = ({
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
      d="M4 4v4h17V6a1 1 0 0 0-1-1h-8L9.774 3.22A1 1 0 0 0 9.149 3H5a1 1 0 0 0-1 1m0 5.5h17V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm12.25 2.75A.75.75 0 0 1 17 13v1.5h1.5a.75.75 0 0 1 0 1.5H17v1.5a.75.75 0 0 1-1.5 0V16H14a.75.75 0 0 1 0-1.5h1.5V13a.75.75 0 0 1 .75-.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Folder2Panel;
