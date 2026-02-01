import { html } from 'lit';
const Drink2Panel = ({
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
      d="m12.426 4.628 3.953-.879-.277-1.246-4.953 1.1v3.279H6l.933 14.468h10.134L18 6.882h-5.574zm4.02 6.509H7.554l-.192-2.979h9.276z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Drink2Panel;
