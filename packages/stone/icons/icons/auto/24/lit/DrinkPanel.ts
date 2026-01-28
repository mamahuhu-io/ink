import { html } from 'lit';
const DrinkPanel = ({
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
      d="M6.515 4H5l.214 1.5L7 18h9l1.786-12.5L18 4H6.515m.715 5h8.54l.5-3.5H6.73zM6 20.75h11v-1.5H6z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default DrinkPanel;
