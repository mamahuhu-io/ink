import { html } from 'lit';
const Triangle = ({
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
      d="m12 2.5 9.96 17.25H2.04zm0 3L4.64 18.25H19.36z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Triangle;
