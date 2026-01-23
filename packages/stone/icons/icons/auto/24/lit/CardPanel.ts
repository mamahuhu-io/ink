import { html } from 'lit';
const CardPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M3.5 7.306c0-1.044.846-1.89 1.889-1.89H18.61c1.043 0 1.889.846 1.889 1.89v1.18h-17zm0 2.597h17v7.792a1.89 1.89 0 0 1-1.889 1.888H5.39A1.89 1.89 0 0 1 3.5 17.695zm1.889 7.791h3.778v-1.888H5.389z" clip-rule="evenodd"/>
  </svg>
`;
export default CardPanel;
