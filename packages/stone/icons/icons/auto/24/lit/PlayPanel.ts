import { html } from 'lit';
const PlayPanel = ({
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
      d="M12 20a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17m-.703-11.413a.5.5 0 0 0-.797.402v5.022a.5.5 0 0 0 .797.402l3.407-2.51a.5.5 0 0 0 0-.806z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default PlayPanel;
