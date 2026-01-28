import { html } from 'lit';
const Unsucessful = ({
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
      d="M2.293 2.293a1 1 0 0 1 1.414 0l4 4 14 14a1 1 0 0 1-1.414 1.414L16.586 18H16.5a1 1 0 0 1-.997-1.082l-1.542-1.543A6 6 0 0 1 9 18H7A6 6 0 0 1 4.946 6.36L2.293 3.708a1 1 0 0 1 0-1.414m4.312 5.726A4 4 0 0 0 7 16h2a4 4 0 0 0 3.509-2.077l-1.572-1.572A1 1 0 0 1 9 12q.001-.732.169-1.417zM15 8c-.556 0-1.084.113-1.562.316a1 1 0 1 1-.783-1.84A6 6 0 0 1 15 6h2a6 6 0 0 1 4.615 9.835 1 1 0 0 1-1.538-1.279A4 4 0 0 0 17 8z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Unsucessful;
