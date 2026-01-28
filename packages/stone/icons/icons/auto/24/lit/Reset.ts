import { html } from 'lit';
const Reset = ({
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
      d="M3.25 12a8.75 8.75 0 0 1 14.584-6.522l.002.002 1.414 1.277V4a.75.75 0 0 1 1.5 0v4.444a.75.75 0 0 1-.75.75h-4.444a.75.75 0 1 1 0-1.5h2.494l-1.217-1.098-.001-.001a7.25 7.25 0 1 0 2.238 7.017.75.75 0 1 1 1.463.332A8.75 8.75 0 0 1 3.25 12"
    />
  </svg>
`;
export default Reset;
