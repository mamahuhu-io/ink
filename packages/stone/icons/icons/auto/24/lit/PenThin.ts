import { html } from 'lit';
const PenThin = ({
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
    <path fill="currentColor" d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
  </svg>
`;
export default PenThin;
