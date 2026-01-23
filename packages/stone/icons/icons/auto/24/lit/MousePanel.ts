import { html } from 'lit';
const MousePanel =
  ({ width = '1em', height = '1em', style = '' }: { width?: string, height?: string, style?: string } = {}) =>
    html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width=${width}
    height=${height}
    fill="none"
    style=${'user-select:none;flex-shrink:0;' + style}
  >
    <path fill='currentColor' fill-rule="evenodd" d="m3.785 4.37 5.68 13.995c.143.35.592.45.87.194l3.116-2.88 3.672 3.973a1.082 1.082 0 1 0 1.59-1.469L15.04 14.21l3.117-2.88a.54.54 0 0 0-.125-.882L4.528 3.682a.541.541 0 0 0-.743.687" clip-rule="evenodd"/>
  </svg>
`;
export default MousePanel;
