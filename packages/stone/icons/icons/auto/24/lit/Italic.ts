import { html } from 'lit';
const Italic = ({
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
      d="M14.608 3.25H10.25a.75.75 0 0 0 0 1.5h3.34l-4.758 14.5H5a.75.75 0 0 0 0 1.5h8.75a.75.75 0 0 0 0-1.5h-3.34l4.758-14.5H19a.75.75 0 0 0 0-1.5h-4.392"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Italic;
