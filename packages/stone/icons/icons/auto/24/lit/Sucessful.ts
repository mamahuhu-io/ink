import { html } from 'lit';
const Sucessful = ({
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
      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12m14.678-3.735a1 1 0 0 1 .057 1.413l-5.539 6a1 1 0 0 1-1.47 0l-2.46-2.666a1 1 0 1 1 1.469-1.357l1.726 1.87 4.804-5.203a1 1 0 0 1 1.413-.057"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Sucessful;
