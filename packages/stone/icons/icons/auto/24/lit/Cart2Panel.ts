import { html } from 'lit';
const Cart2Panel = ({
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
      d="M10.403 4.913a.5.5 0 0 0-.205-.677l-.881-.472a.5.5 0 0 0-.677.204L5.409 10H2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h.997l1.412 8h13.576l1.412-8h.603a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-2.515l-3.231-6.032a.5.5 0 0 0-.677-.204l-.881.472a.5.5 0 0 0-.205.677L15.716 10H7.678z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Cart2Panel;
