import { html } from 'lit';
const Comment = ({
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
      d="M12.5 3.75a7.75 7.75 0 0 0-7.022 11.033.85.85 0 0 1 .068.5l-.634 3.805 3.804-.634a.85.85 0 0 1 .5.068A7.75 7.75 0 1 0 12.5 3.75M3.25 11.5a9.25 9.25 0 1 1 5.517 8.466l-4.506.75a.85.85 0 0 1-.978-.977l.751-4.506A9.2 9.2 0 0 1 3.25 11.5"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Comment;
