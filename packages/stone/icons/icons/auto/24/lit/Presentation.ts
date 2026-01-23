import { html } from 'lit';
const Presentation =
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
    <path fill='currentColor' fill-rule="evenodd" d="M3.174 3.952c0-.426.346-.772.772-.772h15.957a.772.772 0 0 1 0 1.544h-.368v9.853h.367a.772.772 0 0 1 0 1.545h-7.206v1.661l3.942 2.252a.772.772 0 1 1-.766 1.341l-3.176-1.815v1.487a.772.772 0 0 1-1.544 0v-1.421l-3.062 1.75a.772.772 0 1 1-.766-1.341l3.828-2.188v-1.726H3.946a.772.772 0 1 1 0-1.545h.368V4.724h-.368a.77.77 0 0 1-.772-.772m2.684.772h12.133v9.853H5.858zm3.42 4.357a.772.772 0 0 0-1.545 0v2.28a.772.772 0 0 0 1.544 0zm2.646-2.482c.427 0 .772.346.772.772v3.99a.772.772 0 0 1-1.544 0V7.37c0-.426.346-.772.772-.772m4.192 3.622a.772.772 0 0 0-1.545 0v1.14a.772.772 0 1 0 1.545 0z" clip-rule="evenodd"/>
  </svg>
`;
export default Presentation;
