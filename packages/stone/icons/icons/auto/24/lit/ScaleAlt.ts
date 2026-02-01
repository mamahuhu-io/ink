import { html } from 'lit';
const ScaleAlt = ({
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
      d="M13.25 4a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V4.75H14a.75.75 0 0 1-.75-.75M10.75 20a.75.75 0 0 1-.75.75H4a.75.75 0 0 1-.75-.75v-6a.75.75 0 0 1 1.5 0v5.25H10a.75.75 0 0 1 .75.75"
      clip-rule="evenodd"
    />
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="m3.47 19.47 16-16 1.06 1.06-16 16z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ScaleAlt;
