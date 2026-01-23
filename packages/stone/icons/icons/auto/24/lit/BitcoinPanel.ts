import { html } from 'lit';
const BitcoinPanel =
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
    <path fill='currentColor' d="M13.238 14.7a1.012 1.012 0 1 0 0-2.025H10.65V14.7zM10.65 9.3h2.588a1.012 1.012 0 1 1 0 2.025H10.65z"/><path fill='currentColor' fill-rule="evenodd" d="M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0m4.95-4.05V9.3H9.3v5.4H7.95v1.35h3.375v1.35h1.35v-1.35h.563A2.362 2.362 0 0 0 14.89 12a2.362 2.362 0 0 0-1.653-4.05h-.563V6.6h-1.35v1.35z" clip-rule="evenodd"/>
  </svg>
`;
export default BitcoinPanel;
