import { html } from 'lit';
const RightLayout =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.25 8.5a4.25 4.25 0 0 1 4.25-4.25H21a.75.75 0 0 1 0 1.5h-5.5a2.75 2.75 0 0 0-2.75 2.75c0 1.049-.38 2.009-1.01 2.75H21a.75.75 0 0 1 0 1.5h-9.26a4.23 4.23 0 0 1 1.01 2.75 2.75 2.75 0 0 0 2.75 2.75H21a.75.75 0 0 1 0 1.5h-5.5a4.25 4.25 0 0 1-4.25-4.25 2.75 2.75 0 0 0-2.75-2.75H3a.75.75 0 0 1 0-1.5h5.5a2.75 2.75 0 0 0 2.75-2.75" clip-rule="evenodd"/>
  </svg>
`;
export default RightLayout;
