import { html } from 'lit';
const AddOrganize =
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
    <path fill='currentColor' d="M5 5.25c-.69 0-1.25.56-1.25 1.25V17c0 .69.56 1.25 1.25 1.25h8.25a.75.75 0 0 1 0 1.5H5A2.75 2.75 0 0 1 2.25 17V6.5A2.75 2.75 0 0 1 5 3.75h4.672c.729 0 1.428.29 1.944.805l1.195 1.195H19a2.75 2.75 0 0 1 2.75 2.75v2.75a.75.75 0 0 1-1.5 0V8.5c0-.69-.56-1.25-1.25-1.25h-6.5a.75.75 0 0 1-.53-.22l-1.415-1.414a1.25 1.25 0 0 0-.883-.366zM20 14.25a.75.75 0 0 1 .75.75v2.25H23a.75.75 0 0 1 0 1.5h-2.25V21a.75.75 0 0 1-1.5 0v-2.25H17a.75.75 0 0 1 0-1.5h2.25V15a.75.75 0 0 1 .75-.75"/>
  </svg>
`;
export default AddOrganize;
