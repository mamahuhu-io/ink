import { html } from 'lit';
const Zendesk =
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
    <path fill='currentColor' d="M12.546 5v10l8.272-10zM7.136 9.455c2.263 0 4.137-2.281 4.137-4.455H3c0 2.174 1.873 4.455 4.136 4.455M12.546 19c0-2.174 1.873-4.454 4.136-4.454s4.136 2.28 4.136 4.454zM11.273 19V9L3 19z"/>
  </svg>
`;
export default Zendesk;
