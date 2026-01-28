import { html } from 'lit';
const AiEmbedding = ({
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
      d="M12 10.251c.966 0 1.75.784 1.75 1.75v7a1.75 1.75 0 0 1-1.75 1.75H5a1.75 1.75 0 0 1-1.75-1.75v-7c0-.966.784-1.75 1.75-1.75zm-7 1.5a.25.25 0 0 0-.25.25v7c0 .138.112.25.25.25h7a.25.25 0 0 0 .25-.25v-7a.25.25 0 0 0-.25-.25z"
      clip-rule="evenodd"
    />
    <path
      fill="currentColor"
      d="M20.001 16.251a.75.75 0 0 1 .75.75v2a1.75 1.75 0 0 1-1.75 1.75h-2a.75.75 0 0 1 0-1.5h2a.25.25 0 0 0 .25-.25v-2a.75.75 0 0 1 .75-.75M19.001 3.249c.966 0 1.75.784 1.75 1.75v8a.75.75 0 0 1-1.5 0v-8a.25.25 0 0 0-.25-.25h-8a.75.75 0 0 1 0-1.5zM7 3.249a.75.75 0 0 1 0 1.5H5a.25.25 0 0 0-.25.25v2a.75.75 0 0 1-1.5 0v-2c0-.966.784-1.75 1.75-1.75z"
    />
  </svg>
`;
export default AiEmbedding;
