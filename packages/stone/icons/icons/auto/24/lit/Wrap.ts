import { html } from 'lit';
const Wrap =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.046 5a.75.75 0 0 1 .75-.75h2.882a6.072 6.072 0 1 1 0 12.144h-8.89l3.027 3.08a.75.75 0 0 1-1.07 1.052l-4.28-4.356a.75.75 0 0 1 0-1.051l4.28-4.356a.75.75 0 1 1 1.07 1.052l-3.026 3.08h8.889a4.572 4.572 0 1 0 0-9.145h-2.882a.75.75 0 0 1-.75-.75" clip-rule="evenodd"/>
  </svg>
`;
export default Wrap;
