import { html } from 'lit';
const SunPanel = ({
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
      d="M13 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4.6 7.95a5.65 5.65 0 1 1-11.3 0 5.65 5.65 0 0 1 11.3 0M21 12a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-2.929-4.657a1 1 0 1 0-1.414-1.414 1 1 0 0 0 1.414 1.414m0 10.728a1 1 0 1 1-1.414-1.414 1 1 0 0 1 1.414 1.414M13 20a1 1 0 1 0-2 0 1 1 0 0 0 2 0m-8-8a1 1 0 1 1-2 0 1 1 0 0 1 2 0m2.343 6.071a1 1 0 1 0-1.414-1.414 1 1 0 0 0 1.414 1.414m0-10.728A1 1 0 1 1 5.93 5.93a1 1 0 0 1 1.414 1.414"
      clip-rule="evenodd"
    />
  </svg>
`;
export default SunPanel;
