import { html } from 'lit';
const Client =
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
    <path fill='currentColor' fill-rule="evenodd" d="M7.25 5.5H5a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h2.25zm1.5 0v2.75H19.5V6a.5.5 0 0 0-.5-.5zm0 4.25v8.75H19a.5.5 0 0 0 .5-.5V9.75zm0 10.25H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z" clip-rule="evenodd"/>
  </svg>
`;
export default Client;
