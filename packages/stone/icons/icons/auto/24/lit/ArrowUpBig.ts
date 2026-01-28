import { html } from 'lit';
const ArrowUpBig = ({
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
      d="M17.507 10.997a.75.75 0 0 1-1.06-.045L12.75 6.925V19a.75.75 0 0 1-1.5 0V6.925l-3.698 4.027a.75.75 0 1 1-1.104-1.015l5-5.444a.75.75 0 0 1 1.104 0l5 5.444a.75.75 0 0 1-.045 1.06"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ArrowUpBig;
