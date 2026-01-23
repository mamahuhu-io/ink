import { html } from 'lit';
const InformationPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M20.5 11.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0m-9.611-4.253a1.164 1.164 0 1 1 2.322 0l-.358 5.005a.805.805 0 0 1-1.606 0zM12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2" clip-rule="evenodd"/>
  </svg>
`;
export default InformationPanel;
