import { html } from 'lit';
const YoutubeDuotone =
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
    <path fill="red" d="M21.08 7.192a2.55 2.55 0 0 0-.616-1.12 2.36 2.36 0 0 0-1.065-.649C17.925 5 11.991 5 11.991 5s-5.935.013-7.41.436c-.402.115-.77.338-1.064.649-.295.31-.508.696-.617 1.12-.446 2.757-.619 6.957.012 9.603.11.423.322.81.617 1.12s.662.534 1.065.649C6.068 19 12.003 19 12.003 19s5.934 0 7.408-.423c.403-.115.77-.338 1.065-.649.295-.31.508-.697.617-1.12.47-2.76.615-6.958-.012-9.616"/><path fill="#fff" d="m10 15 5-3-5-3z"/>
  </svg>
`;
export default YoutubeDuotone;
