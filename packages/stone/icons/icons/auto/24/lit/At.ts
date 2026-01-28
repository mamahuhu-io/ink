import { html } from 'lit';
const At = ({
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
      d="M12 3.75a8.25 8.25 0 1 0 4.125 15.395.75.75 0 0 1 .75 1.299 9.7 9.7 0 0 1-4.925 1.306c-5.362-.027-9.7-4.382-9.7-9.75 0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75v1.5a3.25 3.25 0 0 1-6.108 1.55A4.75 4.75 0 1 1 16.75 12v1.5a1.75 1.75 0 1 0 3.5 0V12A8.25 8.25 0 0 0 12 3.75M15.25 12a3.25 3.25 0 1 0-6.5 0 3.25 3.25 0 0 0 6.5 0"
      clip-rule="evenodd"
    />
  </svg>
`;
export default At;
