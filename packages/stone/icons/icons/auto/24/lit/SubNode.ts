import { html } from 'lit';
const SubNode = ({
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
      d="M10.354 11.25a2.75 2.75 0 0 1 2.646-2h5a2.75 2.75 0 1 1 0 5.5h-5a2.75 2.75 0 0 1-2.646-2H2a.75.75 0 0 1 0-1.5zm2.646-.5a1.25 1.25 0 1 0 0 2.5h5a1.25 1.25 0 1 0 0-2.5z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default SubNode;
