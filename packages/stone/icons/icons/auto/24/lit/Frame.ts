import { html } from 'lit';
const Frame = ({
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
      d="M7 20.75a.75.75 0 0 1-.75-.75v-2.25H4a.75.75 0 0 1 0-1.5h2.25v-8.5H4a.75.75 0 0 1 0-1.5h2.25V4a.75.75 0 0 1 1.5 0v2.25h8.5V4a.75.75 0 0 1 1.5 0v2.25H20a.75.75 0 0 1 0 1.5h-2.25v8.5H20a.75.75 0 0 1 0 1.5h-2.25V20a.75.75 0 0 1-1.5 0v-2.25h-8.5V20a.75.75 0 0 1-.75.75m9.25-4.5v-8.5h-8.5v8.5z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Frame;
