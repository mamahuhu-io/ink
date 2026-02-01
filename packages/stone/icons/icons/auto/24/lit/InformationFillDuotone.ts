import { html } from 'lit';
const InformationFillDuotone = ({
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
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25M12 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2zm1 4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default InformationFillDuotone;
