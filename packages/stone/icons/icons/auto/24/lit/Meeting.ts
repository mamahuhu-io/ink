import { html } from 'lit';
const Meeting = ({
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
      d="M3 6.643C3 5.459 3.96 4.5 5.143 4.5h8.571c1.184 0 2.143.96 2.143 2.143v2.425l4.283-2.49c.714-.415 1.61.1 1.61.927v8.99c0 .826-.896 1.342-1.61.926l-4.283-2.49v2.426c0 1.184-.96 2.143-2.143 2.143H5.143A2.143 2.143 0 0 1 3 17.357zM5.143 6h8.571c.355 0 .643.288.643.643v10.714a.643.643 0 0 1-.643.643H5.143a.643.643 0 0 1-.643-.643V6.643c0-.355.288-.643.643-.643M16 13.28v-2.56l4.25-2.47v7.5z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Meeting;
