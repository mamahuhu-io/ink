import { html } from 'lit';
const BrokenImage = ({
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
      d="M3.25 6A2.75 2.75 0 0 1 6 3.25h12A2.75 2.75 0 0 1 20.75 6v5a.75.75 0 0 1-1.5 0V6c0-.69-.56-1.25-1.25-1.25H6c-.69 0-1.25.56-1.25 1.25v8.19l3.305-3.306a2.75 2.75 0 0 1 3.89 0l.585.586a.75.75 0 1 1-1.06 1.06l-.586-.585a1.25 1.25 0 0 0-1.768 0L4.75 16.31V18c0 .69.56 1.25 1.25 1.25h5a.75.75 0 0 1 0 1.5H6A2.75 2.75 0 0 1 3.25 18z"
      clip-rule="evenodd"
    />
    <path fill="currentColor" d="M15 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M13.47 13.47a.75.75 0 0 1 1.06 0L17 15.94l2.47-2.47a.75.75 0 1 1 1.06 1.06L18.06 17l2.47 2.47a.75.75 0 1 1-1.06 1.06L17 18.06l-2.47 2.47a.75.75 0 1 1-1.06-1.06L15.94 17l-2.47-2.47a.75.75 0 0 1 0-1.06"
      clip-rule="evenodd"
    />
  </svg>
`;
export default BrokenImage;
