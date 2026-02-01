import { html } from 'lit';
const ShoesPanel = ({
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
      d="M3 13.353V15a1 1 0 0 0 1 1h11.455a10 10 0 0 0 2.552-.335l.332-.088a3.43 3.43 0 0 0 2.506-2.786.858.858 0 0 0-.848-.991h-2.03L12.39 8.567a1.24 1.24 0 0 0-1.452.15L9.069 10.4H6.842l-.91-1.079a1 1 0 0 0-1.704.302L3.121 12.67a2 2 0 0 0-.121.684"
    />
  </svg>
`;
export default ShoesPanel;
