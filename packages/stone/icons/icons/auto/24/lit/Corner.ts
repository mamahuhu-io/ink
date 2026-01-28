import { html } from 'lit';
const Corner = ({
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
      d="M4.8 3.25H3.25V4.8h1.5v-.05h.05zM8 3.25H6.4v1.5H8zM9.6 3.25v1.5H16A3.25 3.25 0 0 1 19.25 8v6.4h1.5V8A4.75 4.75 0 0 0 16 3.25zM3.25 6.4V8h1.5V6.4zM3.25 9.6v1.6h1.5V9.6zM3.25 12.8v1.6h1.5v-1.6zM20.75 17.6V16h-1.5v1.6zM3.25 16v1.6h1.5V16zM20.75 20.75V19.2h-1.5v.05h-.05v1.5zM4.75 19.2h-1.5v1.55H4.8v-1.5h-.05zM6.4 20.75H8v-1.5H6.4zM9.6 20.75h1.6v-1.5H9.6zM12.8 20.75h1.6v-1.5h-1.6zM16 20.75h1.6v-1.5H16z"
    />
  </svg>
`;
export default Corner;
