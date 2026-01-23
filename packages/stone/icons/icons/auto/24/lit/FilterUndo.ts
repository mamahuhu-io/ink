import { html } from 'lit';
const FilterUndo =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.575 2.018a.75.75 0 0 0-1.15.964l15.5 18.5a.75.75 0 0 0 1.15-.964zM21.75 12a9.7 9.7 0 0 1-1.634 5.404L19.11 16.19a8.25 8.25 0 0 0-9.91-11.951L8.189 3.023A9.7 9.7 0 0 1 12 2.25c5.385 0 9.75 4.365 9.75 9.75m-8.1 3.874-.931-1.124H11a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 .65-.377M9 13.25h2.475l-1.244-1.5H9a.75.75 0 0 0 0 1.5m7-3h-1.816l-1.244-1.5H16a.75.75 0 0 1 0 1.5m-7.013 0L7.772 8.785A.75.75 0 0 0 8 10.25zM3.75 12c0-2.12.8-4.054 2.115-5.515l-.967-1.166A9.72 9.72 0 0 0 2.25 12c0 5.385 4.365 9.75 9.75 9.75a9.7 9.7 0 0 0 5.252-1.534l-.966-1.165A8.25 8.25 0 0 1 3.75 12" clip-rule="evenodd"/>
  </svg>
`;
export default FilterUndo;
