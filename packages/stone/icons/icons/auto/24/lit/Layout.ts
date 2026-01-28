import { html } from 'lit';
const Layout = ({
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
      d="M3.25 5.74a2.49 2.49 0 0 1 2.49-2.49h3.52a2.49 2.49 0 0 1 2.49 2.49v12.52a2.49 2.49 0 0 1-2.49 2.49H5.74a2.49 2.49 0 0 1-2.49-2.49zm2.49-.99a.99.99 0 0 0-.99.99v12.52c0 .547.443.99.99.99h3.52a.99.99 0 0 0 .99-.99V5.74a.99.99 0 0 0-.99-.99zm7.51.99a2.49 2.49 0 0 1 2.49-2.49h2.52a2.49 2.49 0 0 1 2.49 2.49v3.52a2.49 2.49 0 0 1-2.49 2.49h-2.52a2.49 2.49 0 0 1-2.49-2.49zm2.49-.99a.99.99 0 0 0-.99.99v3.52c0 .547.443.99.99.99h2.52a.99.99 0 0 0 .99-.99V5.74a.99.99 0 0 0-.99-.99zm0 8.5a2.49 2.49 0 0 0-2.49 2.49v2.52a2.49 2.49 0 0 0 2.49 2.49h2.52a2.49 2.49 0 0 0 2.49-2.49v-2.52a2.49 2.49 0 0 0-2.49-2.49zm-.99 2.49a.99.99 0 0 1 .99-.99h2.52a.99.99 0 0 1 .99.99v2.52a.99.99 0 0 1-.99.99h-2.52a.99.99 0 0 1-.99-.99z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Layout;
