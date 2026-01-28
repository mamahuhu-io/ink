import { html } from 'lit';
const History = ({
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
      d="M7.168 6.595h-.001l-1.217 1.1H7.5a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75V5a.75.75 0 0 1 1.5 0v1.757l1.416-1.279a8.75 8.75 0 1 1-2.7 8.466.75.75 0 1 1 1.464-.332 7.25 7.25 0 1 0 2.238-7.017"
      clip-rule="evenodd"
    />
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M12 6.75a.75.75 0 0 1 .75.75v4.19l2.78 2.78a.75.75 0 1 1-1.06 1.06l-2.971-2.97a.85.85 0 0 1-.249-.601V7.5a.75.75 0 0 1 .75-.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default History;
