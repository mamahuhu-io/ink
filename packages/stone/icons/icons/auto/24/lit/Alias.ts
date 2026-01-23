import { html } from 'lit';
const Alias =
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
    <path fill='currentColor' fill-rule="evenodd" d="M12.574 3.313a.75.75 0 0 1 .81.136l8.125 7.5a.75.75 0 0 1 0 1.102l-8.126 7.5A.75.75 0 0 1 12.125 19v-4.012c-3.68.112-5.78 1.038-6.948 1.89-.626.457-1 .904-1.213 1.22a3 3 0 0 0-.25.45l-.004.012a.75.75 0 0 1-1.46-.242c0-3.999 1.713-6.61 3.934-8.195 1.906-1.361 4.153-1.946 5.94-2.073V4a.75.75 0 0 1 .45-.687m-8.551 12.56q.128-.104.27-.206c1.556-1.136 4.19-2.19 8.581-2.19a.75.75 0 0 1 .75.75v3.06l6.27-5.787-6.27-5.787v3.06a.75.75 0 0 1-.75.75c-1.638 0-3.944.482-5.819 1.82-1.364.975-2.525 2.418-3.032 4.53" clip-rule="evenodd"/>
  </svg>
`;
export default Alias;
