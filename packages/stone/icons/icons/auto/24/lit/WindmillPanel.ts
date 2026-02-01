import { html } from 'lit';
const WindmillPanel = ({
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
      d="M12.45 11.978c-.247.024-.45-.18-.45-.429V3.431c0-.25.203-.454.45-.429a4.51 4.51 0 0 1 0 8.976m-.428.473c-.024-.248.18-.45.43-.45h8.117c.25 0 .454.202.43.45a4.51 4.51 0 0 1-8.977 0M11.55 12c.25 0 .453-.203.429-.451a4.51 4.51 0 0 0-8.976 0c-.025.248.18.45.429.45zm0 .021c.249-.024.451.18.451.43v8.117c0 .25-.202.454-.45.43a4.51 4.51 0 0 1 0-8.977"
      clip-rule="evenodd"
    />
  </svg>
`;
export default WindmillPanel;
