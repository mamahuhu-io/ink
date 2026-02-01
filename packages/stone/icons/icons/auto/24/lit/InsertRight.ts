import { html } from 'lit';
const InsertRight = ({
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
      d="M6 3.75A1.75 1.75 0 0 0 4.25 5.5v13c0 .966.784 1.75 1.75 1.75h4a1.75 1.75 0 0 0 1.75-1.75v-13A1.75 1.75 0 0 0 10 3.75zM5.75 5.5A.25.25 0 0 1 6 5.25h4a.25.25 0 0 1 .25.25v13a.25.25 0 0 1-.25.25H6a.25.25 0 0 1-.25-.25zm11.5 4a.75.75 0 0 0-1.5 0v1.75H14a.75.75 0 0 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0v-1.75H19a.75.75 0 0 0 0-1.5h-1.75z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default InsertRight;
