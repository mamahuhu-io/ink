import { html } from 'lit';
const Period = ({
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
    <path fill="currentColor" d="M10.5 6.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0z" />
  </svg>
`;
export default Period;
