import { html } from 'lit';
const HidePanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M6.558 4a.75.75 0 1 0-1.116 1l13 14.5a.75.75 0 0 0 1.116-1zm15.314 7.819a11 11 0 0 1-2.887 3.884l-2.299-2.548a4.5 4.5 0 0 0-5.402-5.989L9.663 5.368C10.51 5.136 11.453 5 12.5 5c6.276 0 8.807 4.875 9.372 6.181.09.206.09.432 0 .638M8 11.5c0-.584.111-1.143.314-1.655L6.015 7.297a11 11 0 0 0-2.887 3.884.8.8 0 0 0 0 .638C3.693 13.125 6.224 18 12.5 18c1.047 0 1.99-.136 2.838-.368l-1.622-1.798A4.5 4.5 0 0 1 8 11.5" clip-rule="evenodd"/>
  </svg>
`;
export default HidePanel;
