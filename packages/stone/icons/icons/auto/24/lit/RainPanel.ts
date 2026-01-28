import { html } from 'lit';
const RainPanel = ({
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
      d="M6.6 14.7a3.6 3.6 0 0 1 0-7.2 4.5 4.5 0 0 1 8.914-.88 3.15 3.15 0 0 1 2.746 3.634 2.25 2.25 0 1 1 .49 4.446zm-2.122 4.535 1.875-3A.5.5 0 0 1 6.777 16h.137a.5.5 0 0 1 .424.765l-1.875 3A.5.5 0 0 1 5.04 20h-.137a.5.5 0 0 1-.424-.765m6.875-3-1.875 3a.5.5 0 0 0 .424.765h.137a.5.5 0 0 0 .424-.235l1.875-3a.5.5 0 0 0-.424-.765h-.137a.5.5 0 0 0-.424.235m3.125 3 1.875-3a.5.5 0 0 1 .424-.235h.137a.5.5 0 0 1 .424.765l-1.875 3a.5.5 0 0 1-.424.235h-.137a.5.5 0 0 1-.424-.765"
      clip-rule="evenodd"
    />
  </svg>
`;
export default RainPanel;
