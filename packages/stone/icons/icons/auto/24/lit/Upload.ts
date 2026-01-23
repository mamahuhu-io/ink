import { html } from 'lit';
const Upload =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5 10.75a.25.25 0 0 0-.25.25v7c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25v-7a.25.25 0 0 0-.25-.25h-1a.75.75 0 0 1 0-1.5h1c.966 0 1.75.784 1.75 1.75v7A2.75 2.75 0 0 1 18 20.75H6A2.75 2.75 0 0 1 3.25 18v-7c0-.966.784-1.75 1.75-1.75h1a.75.75 0 0 1 0 1.5z" clip-rule="evenodd"/><path fill='currentColor' fill-rule="evenodd" d="M12 2.75a.75.75 0 0 1 .53.22l4 4a.75.75 0 0 1-1.06 1.06l-2.72-2.72V15.5a.75.75 0 0 1-1.5 0V5.31L8.53 8.03a.75.75 0 0 1-1.06-1.06l4-4a.75.75 0 0 1 .53-.22" clip-rule="evenodd"/>
  </svg>
`;
export default Upload;
