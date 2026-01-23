import { html } from 'lit';
const Replace =
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
    <path fill='currentColor' fill-rule="evenodd" d="M17.777 13.505a.75.75 0 0 1-1.115-.007l-2.223-2.5a.75.75 0 0 1 1.122-.996l.911 1.025V6a.25.25 0 0 0-.25-.25H10a.75.75 0 0 1 0-1.5h6.222c.967 0 1.75.784 1.75 1.75v5.063l.974-1.068a.75.75 0 0 1 1.108 1.01zm-11.054-3.01a.75.75 0 0 1 1.115.007l2.223 2.5a.75.75 0 0 1-1.122.996l-.911-1.025V18c0 .138.112.25.25.25H14.5a.75.75 0 0 1 0 1.5H8.278A1.75 1.75 0 0 1 6.528 18v-5.063l-.974 1.068a.75.75 0 1 1-1.108-1.01z" clip-rule="evenodd"/>
  </svg>
`;
export default Replace;
