import { html } from 'lit';
const ContactWithUs =
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
    <path fill='currentColor' d="M8.5 10.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2M13 9.8a1 1 0 1 1-2 0 1 1 0 0 1 2 0M15.5 10.8a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/><path fill='currentColor' fill-rule="evenodd" d="M6.286 2.964A3.036 3.036 0 0 0 3.25 6v7.5a3.036 3.036 0 0 0 3.036 3.036H7.82v3.821a.75.75 0 0 0 1.28.53l4.352-4.351h4.261A3.036 3.036 0 0 0 20.75 13.5V6a3.036 3.036 0 0 0-3.036-3.036zM4.75 6c0-.848.688-1.536 1.536-1.536h11.428c.848 0 1.536.688 1.536 1.536v7.5c0 .848-.688 1.536-1.536 1.536h-4.571a.75.75 0 0 0-.53.22l-3.292 3.29v-2.76a.75.75 0 0 0-.75-.75H6.286A1.536 1.536 0 0 1 4.75 13.5z" clip-rule="evenodd"/>
  </svg>
`;
export default ContactWithUs;
