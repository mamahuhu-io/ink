import { html } from 'lit';
const CartPanel =
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
    <path fill='currentColor' d="M2.312 4a.812.812 0 0 0 0 1.624h2.7l1.71 12.486a.81.81 0 0 0 .804.702h2.133a1.419 1.419 0 1 0 1.106 0h5.986a1.419 1.419 0 1 0 1.106 0H21a.812.812 0 1 0 0-1.624H8.234l-.21-1.537 11.185-1.075c.47-.045.858-.391.955-.854L21.52 7.3a1.082 1.082 0 0 0-1.06-1.306H6.703l-.177-1.292A.81.81 0 0 0 5.721 4z"/>
  </svg>
`;
export default CartPanel;
