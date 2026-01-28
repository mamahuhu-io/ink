import { html } from 'lit';
const AlignBottom = ({
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
      d="M15 4a1 1 0 0 1 1 1v12a1 1 0 0 1-.031.25H20a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1 0-1.5h4.031A1 1 0 0 1 8 17v-6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v6a1 1 0 0 1-.031.25h2.063A1 1 0 0 1 13 17V5a1 1 0 0 1 1-1z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default AlignBottom;
