import { html } from 'lit';
const MakeItReal =
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
    <path fill='currentColor' fill-rule="evenodd" d="M2.274 10.907c-.641.776-.047 1.943.958 1.88l3.617-.225 1.945 3.059c.54.85 1.833.644 2.084-.33l.686-2.666 7.406 7.405a.75.75 0 0 0 1.06-1.06l-7.405-7.406 2.666-.687c.975-.25 1.18-1.544.33-2.084l-3.058-1.944.225-3.618c.062-1.004-1.104-1.599-1.88-.958L8.113 4.581 4.743 3.25c-.937-.37-1.862.556-1.493 1.492l1.332 3.37zm4.688.145-3.018.188L5.87 8.909a1.15 1.15 0 0 0 .183-1.155L4.942 4.94l2.812 1.111c.39.154.832.084 1.155-.182l2.332-1.926-.188 3.018a1.15 1.15 0 0 0 .53 1.042l2.553 1.622-2.929.754a1.15 1.15 0 0 0-.826.827l-.755 2.928-1.622-2.552a1.15 1.15 0 0 0-1.042-.53" clip-rule="evenodd"/>
  </svg>
`;
export default MakeItReal;
