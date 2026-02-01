import { html } from 'lit';
const HomePanel = ({
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
      d="M4.8 9.4A2 2 0 0 0 4 11v7a2 2 0 0 0 2 2h4v-5h4v5h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-.8-1.6l-6-4.5a2 2 0 0 0-2.4 0z"
    />
  </svg>
`;
export default HomePanel;
