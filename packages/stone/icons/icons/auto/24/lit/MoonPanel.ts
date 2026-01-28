import { html } from 'lit';
const MoonPanel = ({
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
      d="M12 20a8 8 0 0 0 7.954-8.867c-.023-.208-.324-.23-.412-.04a5 5 0 1 1-6.635-6.635c.19-.088.168-.39-.04-.412A8 8 0 1 0 12 20"
      clip-rule="evenodd"
    />
  </svg>
`;
export default MoonPanel;
