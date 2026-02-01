import { html } from 'lit';
const ShortPantsPanel = ({
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
      d="M16.097 5H7.903a.5.5 0 0 0-.48.362l-3.74 13a.5.5 0 0 0 .481.638h5.65a.5.5 0 0 0 .487-.387l1.212-5.201c.12-.516.854-.516.974 0l1.212 5.201a.5.5 0 0 0 .487.387h5.65a.5.5 0 0 0 .48-.638l-3.738-13a.5.5 0 0 0-.48-.362"
    />
  </svg>
`;
export default ShortPantsPanel;
