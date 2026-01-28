import { html } from 'lit';
const PhonePanel = ({
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
      d="M13.95 6H15v12H8V6h1.05c.155.537.65.93 1.237.93h2.426c.587 0 1.082-.393 1.237-.93M6 6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default PhonePanel;
