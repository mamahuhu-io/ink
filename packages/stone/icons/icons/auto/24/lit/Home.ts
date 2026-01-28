import { html } from 'lit';
const Home = ({
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
      d="M19.5 19.5v-9.022a.5.5 0 0 0-.193-.394l-7-5.445a.5.5 0 0 0-.614 0l-7 5.445a.5.5 0 0 0-.193.394V19.5a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5M3.772 8.9A2 2 0 0 0 3 10.477V19.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9.022a2 2 0 0 0-.772-1.579l-7-5.444a2 2 0 0 0-2.456 0z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Home;
