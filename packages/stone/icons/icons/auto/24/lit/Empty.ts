import { html } from 'lit';
const Empty =
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
    <path fill='currentColor' fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25m3.525 6.22a.75.75 0 0 1 0 1.06l-2.465 2.465 2.475 2.475a.75.75 0 0 1-1.06 1.06l-2.476-2.474-2.473 2.473a.75.75 0 1 1-1.06-1.06l2.473-2.474-2.46-2.459a.75.75 0 1 1 1.062-1.06l2.458 2.459 2.466-2.466a.75.75 0 0 1 1.06 0" clip-rule="evenodd"/>
  </svg>
`;
export default Empty;
