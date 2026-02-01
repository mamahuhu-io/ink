import { html } from 'lit';
const MapPanel = ({
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
      d="m13.8 5.551-3.6-1.2V17.95l3.6 1.2zM15.6 19.149l3.862-1.288A2.25 2.25 0 0 0 21 15.728V6.873a2.25 2.25 0 0 0-2.962-2.135l-2.438.813zM4.538 5.638 8.4 4.351V17.95l-2.438.813A2.25 2.25 0 0 1 3 16.627V7.773c0-.968.62-1.828 1.538-2.135"
    />
  </svg>
`;
export default MapPanel;
