import { html } from 'lit';
const Done = ({
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
      d="M19.53 6.47a.75.75 0 0 1 0 1.06l-10 10a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L9 15.94l9.47-9.47a.75.75 0 0 1 1.06 0"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Done;
