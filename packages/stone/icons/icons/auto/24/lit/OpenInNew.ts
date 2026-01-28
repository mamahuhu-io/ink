import { html } from 'lit';
const OpenInNew = ({
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
      d="M13.25 4a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V5.81l-8.72 8.72a.75.75 0 1 1-1.06-1.06l8.72-8.72H14a.75.75 0 0 1-.75-.75M6 6.75c-.69 0-1.25.56-1.25 1.25v10c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25v-4a.75.75 0 0 1 1.5 0v4A2.75 2.75 0 0 1 16 20.75H6A2.75 2.75 0 0 1 3.25 18V8A2.75 2.75 0 0 1 6 5.25h4a.75.75 0 0 1 0 1.5z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default OpenInNew;
