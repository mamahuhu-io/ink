import { html } from 'lit';
const UmbrellaPanel = ({
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
      d="M13 2.8a1 1 0 0 0-2 0v1.262a8.004 8.004 0 0 0-6.938 6.94c-.068.548.386.998.938.998h6v6.3a1.2 1.2 0 0 1-2.4 0v-1a1 1 0 1 0-2 0v1a3.2 3.2 0 0 0 6.4 0V12h6c.552 0 1.007-.45.938-.998A8.004 8.004 0 0 0 13 4.062z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default UmbrellaPanel;
