import { html } from 'lit';
const EmailWarning = ({
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
      d="M5 4.25A2.75 2.75 0 0 0 2.25 7v10A2.75 2.75 0 0 0 5 19.75h11.5a.75.75 0 0 0 0-1.5H5c-.69 0-1.25-.56-1.25-1.25V9.401l6.725 4.483a2.75 2.75 0 0 0 3.05 0l6.725-4.483V10.5a.75.75 0 0 0 1.5 0V7A2.75 2.75 0 0 0 19 4.25zm6.307 8.386L3.75 7.6V7c0-.69.56-1.25 1.25-1.25h14c.69 0 1.25.56 1.25 1.25v.599l-7.556 5.037c-.42.28-.967.28-1.387 0"
      clip-rule="evenodd"
    />
    <path
      fill="currentColor"
      d="M20.75 14a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0zM20 19.25a.75.75 0 0 0 0 1.5h.01a.75.75 0 0 0 0-1.5z"
    />
  </svg>
`;
export default EmailWarning;
