import { html } from 'lit';
const DirectionSign4Panel = ({
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
      d="M13 2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5V4H7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4v2H7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h4v5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-5h4.112a1 1 0 0 0 .711-.297l1.482-1.5a1 1 0 0 0 0-1.406l-1.482-1.5a1 1 0 0 0-.711-.297H13V9h4.112a1 1 0 0 0 .711-.297l1.482-1.5a1 1 0 0 0 0-1.406l-1.482-1.5A1 1 0 0 0 17.112 4H13z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default DirectionSign4Panel;
