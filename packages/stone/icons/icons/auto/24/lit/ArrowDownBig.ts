import { html } from 'lit';
const ArrowDownBig = ({
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
      d="M17.507 13.003a.75.75 0 0 0-1.06.045l-3.697 4.027V5a.75.75 0 0 0-1.5 0v12.075l-3.698-4.027a.75.75 0 1 0-1.104 1.015l5 5.444a.75.75 0 0 0 1.104 0l5-5.444a.75.75 0 0 0-.045-1.06"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ArrowDownBig;
