import { html } from 'lit';
const GobletPanel =
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
    <path fill='currentColor' d="M4.206 4.769a.5.5 0 0 0-.354.853l7.538 7.55v5.839H8.43a.5.5 0 0 0-.5.5v.22a.5.5 0 0 0 .5.5h7.14a.5.5 0 0 0 .5-.5v-.22a.5.5 0 0 0-.5-.5h-2.96v-5.84l7.538-7.55a.5.5 0 0 0-.354-.852z"/>
  </svg>
`;
export default GobletPanel;
