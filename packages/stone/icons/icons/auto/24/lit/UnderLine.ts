import { html } from 'lit';
const UnderLine = ({
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
      d="M7.744 3.968a.808.808 0 1 0-1.616 0v7.003a5.656 5.656 0 1 0 11.313 0V3.968a.808.808 0 1 0-1.616 0v7.003a4.04 4.04 0 1 1-8.08 0zM4.458 19.32a.808.808 0 0 0 0 1.616h15.084a.808.808 0 1 0 0-1.616z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default UnderLine;
