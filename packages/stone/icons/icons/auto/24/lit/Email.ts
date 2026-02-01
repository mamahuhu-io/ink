import { html } from 'lit';
const Email = ({
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
      d="M2.25 7A2.75 2.75 0 0 1 5 4.25h14A2.75 2.75 0 0 1 21.75 7v10A2.75 2.75 0 0 1 19 19.75H5A2.75 2.75 0 0 1 2.25 17V7m1.5 2.401V17c0 .69.56 1.25 1.25 1.25h14c.69 0 1.25-.56 1.25-1.25V9.401l-6.725 4.483a2.75 2.75 0 0 1-3.05 0zM20.25 7.6l-7.556 5.037c-.42.28-.967.28-1.387 0L3.75 7.6V7c0-.69.56-1.25 1.25-1.25h14c.69 0 1.25.56 1.25 1.25z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Email;
