import { html } from 'lit';
const SnowMountainPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M18.675 17.5H5.51l2.85-4.811.923.737c.419.336 1.015.336 1.434 0l.64-.512a1.15 1.15 0 0 1 1.336-.07l1.03.658c.453.29 1.049.226 1.43-.155l.666-.666zm-15.546.095L11.007 4.3a1.262 1.262 0 0 1 2.17 0l7.88 13.295A1.262 1.262 0 0 1 19.97 19.5H4.214a1.262 1.262 0 0 1-1.085-1.905" clip-rule="evenodd"/>
  </svg>
`;
export default SnowMountainPanel;
