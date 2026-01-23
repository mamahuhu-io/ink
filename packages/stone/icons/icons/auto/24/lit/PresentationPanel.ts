import { html } from 'lit';
const PresentationPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4 5.25a.75.75 0 0 0 0 1.5h1V16a1 1 0 0 0 1 1h4.229l-1.71 1.424a.75.75 0 0 0 .961 1.152l2.52-2.1 2.52 2.1a.75.75 0 1 0 .96-1.152L13.771 17H18a1 1 0 0 0 1-1V6.75h1a.75.75 0 0 0 0-1.5zm12.53 4.78a.75.75 0 1 0-1.06-1.06L13 11.44l-1.47-1.47a.75.75 0 0 0-1.06 0l-2.5 2.5a.75.75 0 1 0 1.06 1.06L11 11.56l1.47 1.47a.75.75 0 0 0 1.06 0z" clip-rule="evenodd"/>
  </svg>
`;
export default PresentationPanel;
