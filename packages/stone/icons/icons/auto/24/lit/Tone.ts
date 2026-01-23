import { html } from 'lit';
const Tone =
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
    <path fill='currentColor' fill-rule="evenodd" d="m9.17 8.506-1.112 2.877a.85.85 0 0 1-.793.544H4a.75.75 0 0 1 0-1.5h2.82l1.699-4.4c.3-.776 1.422-.703 1.618.107l1.96 8.08 1.797-5.67a.85.85 0 0 1 1.483-.263l1.658 2.146H20a.75.75 0 0 1 0 1.5h-3.284a.85.85 0 0 1-.673-.33L14.95 10.18l-2.126 6.705c-.26.82-1.434.78-1.636-.056z" clip-rule="evenodd"/>
  </svg>
`;
export default Tone;
