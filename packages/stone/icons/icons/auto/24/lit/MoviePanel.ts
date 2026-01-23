import { html } from 'lit';
const MoviePanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M2.393 4.794c0-.617.5-1.117 1.117-1.117h16.765c.617 0 1.118.5 1.118 1.117v13.412c0 .617-.5 1.118-1.118 1.118H3.51c-.617 0-1.117-.5-1.117-1.118zM7.98 5.912h7.824v4.47H7.98zm7.824 6.706H7.98v4.47h7.824zM3.51 5.912h2.236v2.235H3.51zm16.765 0H18.04v2.235h2.235zM3.51 10.382h2.236v2.236H3.51zm16.765 0H18.04v2.236h2.235zM3.51 14.853h2.236v2.235H3.51zm16.765 0H18.04v2.235h2.235z" clip-rule="evenodd"/>
  </svg>
`;
export default MoviePanel;
