import { html } from 'lit';
const EndPointCircle = ({
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
      d="M18 8.25a3.75 3.75 0 0 0-3.675 3H3a.75.75 0 0 0 0 1.5h11.325A3.751 3.751 0 0 0 21.75 12 3.75 3.75 0 0 0 18 8.25"
    />
  </svg>
`;
export default EndPointCircle;
