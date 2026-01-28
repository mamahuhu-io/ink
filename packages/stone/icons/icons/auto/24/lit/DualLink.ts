import { html } from 'lit';
const DualLink = ({
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
      d="M10.667 6.2a.75.75 0 0 1 0-1.5H19a.75.75 0 0 1 .75.75v8.333a.75.75 0 0 1-1.5 0V7.261L6.53 18.98a.75.75 0 1 1-1.06-1.061L17.19 6.2z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default DualLink;
