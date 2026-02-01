import { html } from 'lit';
const CameraPanel = ({
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
      d="M5 6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2.5l-2.101-2.334a.5.5 0 0 0-.372-.166H9.973a.5.5 0 0 0-.372.166L7.5 6H5m7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8"
      clip-rule="evenodd"
    />
  </svg>
`;
export default CameraPanel;
