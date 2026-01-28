import { html } from 'lit';
const MailboxPanel = ({
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
      d="M5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm0 4h14v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1zm4 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V12H9z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default MailboxPanel;
