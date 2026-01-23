import { html } from 'lit';
const DeleteTemporarily =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11 2.25A2.75 2.75 0 0 0 8.25 5v1.25H4a.75.75 0 0 0 0 1.5h.302l.817 11.446a2.75 2.75 0 0 0 2.743 2.554H10.5a.75.75 0 0 0 0-1.5H7.862a1.25 1.25 0 0 1-1.247-1.16l-.81-11.34h12.39l-.229 3.197a.75.75 0 1 0 1.496.106l.236-3.303H20a.75.75 0 0 0 0-1.5h-4.25V5A2.75 2.75 0 0 0 13 2.25zm3.25 4V5c0-.69-.56-1.25-1.25-1.25h-2c-.69 0-1.25.56-1.25 1.25v1.25zM10.75 11a.75.75 0 0 0-1.5 0v6a.75.75 0 0 0 1.5 0zm3.25-.75a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75m3 4.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5M12.25 18a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0m5.5-1.5a.75.75 0 0 0-1.5 0V18c0 .199.079.39.22.53l1 1a.75.75 0 1 0 1.06-1.06l-.78-.78z" clip-rule="evenodd"/>
  </svg>
`;
export default DeleteTemporarily;
