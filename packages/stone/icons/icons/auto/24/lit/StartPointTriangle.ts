import { html } from 'lit';
const StartPointTriangle = ({
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
      d="M7.75 8a.75.75 0 0 0-1.28-.53l-4 4a.75.75 0 0 0 0 1.06l4 4A.75.75 0 0 0 7.75 16v-3.25H21a.75.75 0 0 0 0-1.5H7.75z"
    />
  </svg>
`;
export default StartPointTriangle;
