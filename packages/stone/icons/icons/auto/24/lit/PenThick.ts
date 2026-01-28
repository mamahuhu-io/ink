import { html } from 'lit';
const PenThick = ({
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
    <path fill="currentColor" d="M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0" />
  </svg>
`;
export default PenThick;
