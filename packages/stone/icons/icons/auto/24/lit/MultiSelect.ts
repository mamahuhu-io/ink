import { html } from 'lit';
const MultiSelect =
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
    <path fill='currentColor' fill-rule="evenodd" d="M7.53 6.03a.75.75 0 0 0-1.06-1.06l-1.5 1.5-.406-.464a.75.75 0 1 0-1.128.988l.933 1.067a.75.75 0 0 0 1.095.036zm0 5.5a.75.75 0 1 0-1.06-1.06l-1.5 1.5-.406-.464a.75.75 0 0 0-1.128.988l.933 1.066a.75.75 0 0 0 1.095.037zm0 4.44a.75.75 0 0 1 0 1.06l-2.066 2.067a.75.75 0 0 1-1.095-.037l-.933-1.066a.75.75 0 0 1 1.128-.988l.406.463 1.5-1.5a.75.75 0 0 1 1.06 0M10.5 5.25a.75.75 0 0 0 0 1.5h9.6a.75.75 0 0 0 0-1.5zM9.75 12a.75.75 0 0 1 .75-.75h9.6a.75.75 0 0 1 0 1.5h-9.6a.75.75 0 0 1-.75-.75m.75 5.25a.75.75 0 0 0 0 1.5h9.6a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/>
  </svg>
`;
export default MultiSelect;
