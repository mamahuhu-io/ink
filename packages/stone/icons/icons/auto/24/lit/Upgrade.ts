import { html } from 'lit';
const Upgrade = ({
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
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5m-4.621 7.72 4.09-4.091a.75.75 0 0 1 1.061 0l4.091 4.09a.75.75 0 1 1-1.06 1.061L12.75 9.72v6.78a.75.75 0 0 1-1.5 0V9.72l-2.81 2.81a.75.75 0 0 1-1.061-1.06"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Upgrade;
