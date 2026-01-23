import { html } from 'lit';
const MountainPanel =
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
    <path fill='currentColor' d="M3.129 17.595 11.007 4.3a1.262 1.262 0 0 1 2.17 0l7.88 13.295A1.262 1.262 0 0 1 19.97 19.5H4.214a1.262 1.262 0 0 1-1.085-1.905"/>
  </svg>
`;
export default MountainPanel;
