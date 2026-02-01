import { html } from 'lit';
const SunglassPanel = ({
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
      d="M7 7.833A4.16 4.16 0 0 0 3.666 9.5h-.833a.833.833 0 0 0 0 1.667h.084q-.083.405-.084.833a4.167 4.167 0 1 0 8.085-1.421A2.5 2.5 0 0 1 12 10.333c.388 0 .755.088 1.082.246a4.167 4.167 0 1 0 8.001.588h.084a.833.833 0 0 0 0-1.667h-.834A4.16 4.16 0 0 0 17 7.833a4.16 4.16 0 0 0-3.043 1.321A4.15 4.15 0 0 0 12 8.667a4.15 4.15 0 0 0-1.957.487A4.16 4.16 0 0 0 7 7.834"
    />
  </svg>
`;
export default SunglassPanel;
