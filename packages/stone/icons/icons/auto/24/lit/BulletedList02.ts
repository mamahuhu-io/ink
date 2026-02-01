import { html } from 'lit';
const BulletedList02 = ({
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
      d="M7 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5M7 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
      clip-rule="evenodd"
    />
  </svg>
`;
export default BulletedList02;
