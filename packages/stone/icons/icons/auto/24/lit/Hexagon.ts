import { html } from 'lit';
const Hexagon = ({
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
      d="m21.86 12-4.921 8.75H7.06L2.14 12l4.922-8.75h9.878zm-5.799-7.25H7.94L3.86 12l4.079 7.25h8.122L20.14 12z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Hexagon;
