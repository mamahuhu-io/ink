import { html } from 'lit';
const Redo =
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
    <path fill='currentColor' fill-rule="evenodd" d="M15.47 4.47a.75.75 0 0 1 1.06 0l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H13.6c-1.692 0-2.917 0-3.88.08-.954.077-1.585.228-2.103.492a5.25 5.25 0 0 0-2.295 2.295c-.264.518-.415 1.15-.493 2.103-.078.963-.079 2.187-.079 3.88a.75.75 0 0 1-1.5 0v-.034c0-1.651 0-2.937.084-3.968.086-1.047.262-1.897.652-2.662a6.75 6.75 0 0 1 2.95-2.95c.765-.39 1.615-.566 2.662-.652 1.031-.084 2.317-.084 3.968-.084h4.623l-2.72-2.72a.75.75 0 0 1 0-1.06" clip-rule="evenodd"/>
  </svg>
`;
export default Redo;
