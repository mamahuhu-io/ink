import { html } from 'lit';
const Star = ({
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
      d="M14.855 9.3 12 2 9.145 9.3 1 9.64l6.38 4.85L5.202 22 12 17.7l6.798 4.3-2.178-7.51L23 9.64zm3.924 1.664-4.964-.207L12 6.117l-1.815 4.64-4.964.207 3.886 2.956-1.362 4.696L12 15.924l4.255 2.692-1.362-4.696z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Star;
