import { html } from 'lit';
const ExpandWide = ({
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
      d="M4.25 5A.75.75 0 0 1 5 4.25h3.5a.75.75 0 0 1 0 1.5H6.81l3.095 3.095a.75.75 0 0 1-1.06 1.06L5.75 6.811V8.5a.75.75 0 0 1-1.5 0zm10.5 0a.75.75 0 0 1 .75-.75H19a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V6.81l-3.095 3.095a.75.75 0 1 1-1.06-1.06l3.094-3.095H15.5a.75.75 0 0 1-.75-.75m-4.845 9.095a.75.75 0 0 1 0 1.06L6.811 18.25H8.5a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 1 1.5 0v1.69l3.095-3.095a.75.75 0 0 1 1.06 0m4.19 0a.75.75 0 0 1 1.06 0l3.095 3.094V15.5a.75.75 0 0 1 1.5 0V19a.75.75 0 0 1-.75.75h-3.5a.75.75 0 0 1 0-1.5h1.69l-3.095-3.095a.75.75 0 0 1 0-1.06"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ExpandWide;
