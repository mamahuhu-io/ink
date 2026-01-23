import { html } from 'lit';
const MailPanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.389 5.417A1.89 1.89 0 0 0 3.5 7.306v.655l8.5 4.675 8.5-4.675v-.655a1.89 1.89 0 0 0-1.889-1.89zM20.5 9.578l-8.159 4.487a.71.71 0 0 1-.682 0L3.5 9.578v8.117c0 1.043.846 1.888 1.889 1.888H18.61a1.89 1.89 0 0 0 1.889-1.888z" clip-rule="evenodd"/>
  </svg>
`;
export default MailPanel;
