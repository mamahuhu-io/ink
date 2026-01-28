import { html } from 'lit';
const CoinPanel = ({
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
      d="M13.763 5.754A8.1 8.1 0 0 0 6.911 16.03 6.302 6.302 0 0 1 9.3 3.9a6.28 6.28 0 0 1 4.463 1.854"
    />
    <path fill="currentColor" d="M21 13.8a6.3 6.3 0 1 1-12.6 0 6.3 6.3 0 0 1 12.6 0" />
  </svg>
`;
export default CoinPanel;
