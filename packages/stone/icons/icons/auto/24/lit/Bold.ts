import { html } from 'lit';
const Bold = ({
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
      d="M6.25 4A.75.75 0 0 1 7 3.25h5.958c2.67 0 4.875 2.105 4.875 4.75 0 1.515-.723 2.853-1.843 3.72 1.626.764 2.76 2.383 2.76 4.28 0 2.645-2.204 4.75-4.875 4.75H7a.75.75 0 0 1-.75-.75zm1.5 8.75v6.5h6.125c1.886 0 3.375-1.477 3.375-3.25s-1.49-3.25-3.375-3.25zm0-1.5h5.208c1.886 0 3.375-1.477 3.375-3.25s-1.489-3.25-3.375-3.25H7.75z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Bold;
