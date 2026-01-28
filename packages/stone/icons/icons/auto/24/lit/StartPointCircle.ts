import { html } from 'lit';
const StartPointCircle = ({
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
      d="M6 8.25a3.75 3.75 0 1 0 3.675 4.5H21a.75.75 0 0 0 0-1.5H9.675A3.75 3.75 0 0 0 6 8.25"
    />
  </svg>
`;
export default StartPointCircle;
