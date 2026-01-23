import { html } from 'lit';
const Language =
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
    <path fill='currentColor' fill-rule="evenodd" d="M9 2.25a.75.75 0 0 1 .75.75v1.25H15a.75.75 0 0 1 0 1.5h-1.625a18.7 18.7 0 0 1-3.51 7.68 9 9 0 0 0 1.085.97.75.75 0 0 1-.9 1.2c-.405-.304-.79-.645-1.153-1.012A18.8 18.8 0 0 1 3.334 18.8a.75.75 0 0 1-.668-1.344 17.3 17.3 0 0 0 5.238-4.01c-1.05-1.36-1.819-2.9-2.211-4.235a.75.75 0 1 1 1.439-.424c.319 1.085.93 2.332 1.747 3.458a17.2 17.2 0 0 0 2.963-6.496H3.5a.75.75 0 1 1 0-1.5h4.75V3A.75.75 0 0 1 9 2.25m7 8a.75.75 0 0 1 .671.415l3.493 6.986.014.028 1.493 2.986a.75.75 0 1 1-1.342.67l-1.292-2.585h-6.073l-1.293 2.585a.75.75 0 1 1-1.342-.67l1.493-2.986.014-.028 3.493-6.986A.75.75 0 0 1 16 10.25m-2.286 7h4.573L16 12.677z" clip-rule="evenodd"/>
  </svg>
`;
export default Language;
