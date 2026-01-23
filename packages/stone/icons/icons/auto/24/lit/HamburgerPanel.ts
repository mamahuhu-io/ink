import { html } from 'lit';
const HamburgerPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.098 9.84C4.7 6.814 8.008 4.5 12 4.5s7.3 2.314 7.902 5.34c.108.541-.35.993-.902.993H5c-.552 0-1.01-.452-.902-.993M19 14.833h-3.333l-1.293 1.293a1 1 0 0 1-1.414 0l-1.293-1.293H5a1 1 0 0 1-1-1v-.666a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v.666a1 1 0 0 1-1 1M4.5 16.5H11l2.008 1.757a1 1 0 0 0 1.317 0l2.008-1.757H19.5a.5.5 0 0 1 .5.5v1.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V17a.5.5 0 0 1 .5-.5" clip-rule="evenodd"/>
  </svg>
`;
export default HamburgerPanel;
