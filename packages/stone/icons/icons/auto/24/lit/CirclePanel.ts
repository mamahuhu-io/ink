import { html } from 'lit';
const CirclePanel = ({
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
      d="M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17M8.547 12a3.453 3.453 0 1 1 6.906 0 3.453 3.453 0 0 1-6.906 0M12 6.953a5.047 5.047 0 1 0 0 10.094 5.047 5.047 0 0 0 0-10.094"
      clip-rule="evenodd"
    />
  </svg>
`;
export default CirclePanel;
