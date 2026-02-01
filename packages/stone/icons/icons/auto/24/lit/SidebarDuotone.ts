import { html } from 'lit';
const SidebarDuotone = ({
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
      fill="#7A7A7A"
      fill-rule="evenodd"
      d="M19 9.493V17.5a.5.5 0 0 1-.5.5h-8.25V6h4.316a4.3 4.3 0 0 1 0-1.5H5.5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V9.124a4.2 4.2 0 0 1-1.5.369M5.5 6h3.25v12H5.5a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5"
      clip-rule="evenodd"
    />
    <path fill="#1E96EB" d="M21.75 5.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
  </svg>
`;
export default SidebarDuotone;
