import { html } from 'lit';
const DashLine = ({
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
      d="M20.53 3.53a.75.75 0 0 1 0 1.061l-3.19 3.19a.75.75 0 0 1-1.06-1.061l3.19-3.19a.75.75 0 0 1 1.06 0m-6.375 6.375a.75.75 0 0 1 0 1.061l-3.19 3.19a.75.75 0 0 1-1.06-1.061l3.19-3.19a.75.75 0 0 1 1.06 0M7.78 17.341a.75.75 0 0 0-1.06-1.06L3.53 19.47a.75.75 0 1 0 1.06 1.06z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default DashLine;
