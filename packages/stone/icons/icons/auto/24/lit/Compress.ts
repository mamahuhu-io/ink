import { html } from 'lit';
const Compress = ({
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
      d="M14.989 9.742a.75.75 0 0 1-.75-.75V4.978a.75.75 0 0 1 1.5 0v2.203l3.736-3.736a.75.75 0 0 1 1.06 1.06L16.8 8.242h2.203a.75.75 0 0 1 0 1.5zm0 4.491a.75.75 0 0 0-.75.75v4.014a.75.75 0 1 0 1.5 0v-2.203l3.736 3.736a.75.75 0 0 0 1.06-1.06L16.8 15.733h2.203a.75.75 0 0 0 0-1.5zm-5.328.75a.75.75 0 0 0-.75-.75H4.898a.75.75 0 0 0 0 1.5h2.203L3.364 19.47a.75.75 0 1 0 1.061 1.06l3.736-3.736v2.203a.75.75 0 1 0 1.5 0zm-.75-5.241a.75.75 0 0 0 .75-.75V4.978a.75.75 0 1 0-1.5 0v2.203L4.425 3.445a.75.75 0 1 0-1.06 1.06L7.1 8.242H4.898a.75.75 0 0 0 0 1.5z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Compress;
