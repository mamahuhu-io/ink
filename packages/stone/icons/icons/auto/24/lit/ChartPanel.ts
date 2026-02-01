import { html } from 'lit';
const ChartPanel = ({
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
      d="M20.483 12.03a.506.506 0 0 0-.514-.53H12.53a.53.53 0 0 1-.531-.531V3.53a.506.506 0 0 0-.53-.514 8.5 8.5 0 1 0 9.013 9.014m-6.359-9.01a.5.5 0 0 0-.53.511v5.844c0 .293.238.531.531.531h5.844a.5.5 0 0 0 .51-.53 6.906 6.906 0 0 0-6.354-6.356"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ChartPanel;
