import { html } from 'lit';
const InsertTop = ({
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
      d="M6.25 11a.75.75 0 0 1-1.5 0V8a.75.75 0 0 1 .75-.75h2.75V6.5a.75.75 0 0 1 1.28-.53l1.5 1.5a.75.75 0 0 1 0 1.06l-1.5 1.5a.75.75 0 0 1-1.28-.53v-.75h-2zm6-4a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75m0 3.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75M5 13.25a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5zm-.75 4.25a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default InsertTop;
