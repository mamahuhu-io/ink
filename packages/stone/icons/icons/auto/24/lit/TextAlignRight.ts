import { html } from 'lit';
const TextAlignRight = ({
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
      d="M4.25 6A.75.75 0 0 1 5 5.25h15a.75.75 0 0 1 0 1.5H5A.75.75 0 0 1 4.25 6m7 6a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5h-8a.75.75 0 0 1-.75-.75m-3 6a.75.75 0 0 1 .75-.75h11a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default TextAlignRight;
