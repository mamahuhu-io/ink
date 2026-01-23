import { html } from 'lit';
const HighLightDuotone =
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
    <path fill="#7C3AED" d="m5.83 16.441 2.088 2.089-1.34 1.339a.2.2 0 0 1-.18.055L3.37 19.34a.2.2 0 0 1-.103-.338z"/><path fill="#7A7A7A" fill-rule="evenodd" d="M19.01 3.638a2.86 2.86 0 0 0-3.885-.149l-7.804 6.695a2.86 2.86 0 0 0-.74 3.357l.154.337-1.058 1.058a.96.96 0 0 0 0 1.359l2.387 2.386a.96.96 0 0 0 1.359 0l1.058-1.058.336.154a2.86 2.86 0 0 0 3.358-.74l6.694-7.804a2.86 2.86 0 0 0-.148-3.884zm-2.908.99a1.36 1.36 0 0 1 1.847.07L19.66 6.41a1.36 1.36 0 0 1 .07 1.846l-5.088 5.932-4.472-4.472zM9.03 10.696l-.731.626a1.36 1.36 0 0 0-.352 1.597l.352.77c.137.3.081.665-.164.911l-1.015 1.015 1.624 1.625 1.015-1.015a.81.81 0 0 1 .911-.164l.77.351a1.36 1.36 0 0 0 1.597-.351l.627-.731z" clip-rule="evenodd"/>
  </svg>
`;
export default HighLightDuotone;
