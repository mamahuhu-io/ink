import { html } from 'lit';
const TShirtPanel = ({
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
      d="M6.964 20.836V11.01l-.519 1.273L3 11.19l2.671-6.884c.643-1.656 3.12-1.7 4.33-.4.629.673 1.312 1.151 1.999 1.203.687-.052 1.37-.53 1.998-1.203 1.212-1.3 3.688-1.256 4.33.4L21 11.19l-3.445 1.093-.519-1.274v9.827H6.964"
    />
  </svg>
`;
export default TShirtPanel;
