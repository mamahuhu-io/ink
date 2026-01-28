import { html } from 'lit';
const Created = ({
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
      d="M8.75 3.5a.75.75 0 0 0-1.5 0v.75H5A2.75 2.75 0 0 0 2.25 7v12A2.75 2.75 0 0 0 5 21.75h6.5a.75.75 0 0 0 0-1.5H5c-.69 0-1.25-.56-1.25-1.25v-8.75h16.5v1.25a.75.75 0 0 0 1.5 0V7A2.75 2.75 0 0 0 19 4.25h-2.25V3.5a.75.75 0 0 0-1.5 0v.75h-6.5zm6.5 3v-.75h-6.5v.75a.75.75 0 0 1-1.5 0v-.75H5c-.69 0-1.25.56-1.25 1.25v1.75h16.5V7c0-.69-.56-1.25-1.25-1.25h-2.25v.75a.75.75 0 0 1-1.5 0m4.78 6.97a.75.75 0 0 0-1.06 0l-5.098 5.098a.75.75 0 0 0-.22.531l.004 2.224a.75.75 0 0 0 .749.75l2.224.003c.2 0 .39-.079.531-.22l5.098-5.098a.75.75 0 0 0 0-1.06zm-4.878 5.938 4.348-4.347 1.167 1.167-4.347 4.347-1.165-.002z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Created;
