import { html } from 'lit';
const CloudWorkspace = ({
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
      d="M11 5.75a4.25 4.25 0 0 0-4.147 5.183.75.75 0 0 1-.568.896A3.252 3.252 0 0 0 7 18.25h9a4.25 4.25 0 1 0-.085-8.5.75.75 0 0 1-.75-.6A4.25 4.25 0 0 0 11 5.75M5.25 10a5.75 5.75 0 0 1 11.235-1.73A5.75 5.75 0 0 1 16 19.75H7a4.75 4.75 0 0 1-1.722-9.178A6 6 0 0 1 5.25 10"
      clip-rule="evenodd"
    />
  </svg>
`;
export default CloudWorkspace;
