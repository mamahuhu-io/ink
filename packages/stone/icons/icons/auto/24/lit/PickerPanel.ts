import { html } from 'lit';
const PickerPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M17.342 3.468a2 2 0 0 1 2.936 2.717l-2.037 2.202 1.468 1.358a1 1 0 0 1 .055 1.413l-.68.734a1 1 0 0 1-1.413.055L11.8 6.514a1 1 0 0 1-.055-1.413l.68-.734a1 1 0 0 1 1.413-.055l1.468 1.358zm-1.818 7.855-2.936-2.717-7.777 8.405a1 1 0 0 0-.229.41L3.73 20.47a.5.5 0 0 0 .653.604l2.973-1.085c.15-.055.283-.144.391-.26z" clip-rule="evenodd"/>
  </svg>
`;
export default PickerPanel;
