import { html } from 'lit';
const ConfusePanel = ({
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
      d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16m-3-8c.552 0 1-.672 1-1.5S9.552 9 9 9s-1 .672-1 1.5.448 1.5 1 1.5m7-1.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5.448-1.5 1-1.5 1 .672 1 1.5m-.803 4.224a.75.75 0 1 0-.394-1.448l-5.5 1.5a.75.75 0 0 0 .394 1.448z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ConfusePanel;
