import { html } from 'lit';
const HappyPanel = ({
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
      d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16m3-6a3 3 0 1 1-5.83-1h5.66c.11.313.17.65.17 1m-5-3.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S8.448 9 9 9s1 .672 1 1.5m5 1.5c.552 0 1-.672 1-1.5S15.552 9 15 9s-1 .672-1 1.5.448 1.5 1 1.5"
      clip-rule="evenodd"
    />
  </svg>
`;
export default HappyPanel;
