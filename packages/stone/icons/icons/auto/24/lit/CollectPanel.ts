import { html } from 'lit';
const CollectPanel = ({
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
      d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14.057a1 1 0 0 1-1.581.814L12 16l-5.419 3.87A1 1 0 0 1 5 19.058z"
    />
  </svg>
`;
export default CollectPanel;
