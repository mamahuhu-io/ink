import { html } from 'lit';
const Layer =
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
    <path fill='currentColor' fill-rule="evenodd" d="M11.754 3.802a.75.75 0 0 1 .631-.01l7.92 3.523a.75.75 0 0 1 .021 1.36l-8.08 3.904a.75.75 0 0 1-.632.01L3.696 9.067a.75.75 0 0 1-.021-1.36zm.34 1.502-6.312 3.05 6.124 2.723 6.312-3.049zm8.581 6.56a.75.75 0 0 1-.349 1.002l-8.08 3.904a.75.75 0 0 1-.632.01l-7.919-3.523a.75.75 0 0 1 .61-1.37l7.601 3.38 7.768-3.752a.75.75 0 0 1 1.001.35m0 4.31a.75.75 0 0 1-.349 1.001l-8.08 3.904a.75.75 0 0 1-.632.01l-7.919-3.522a.75.75 0 0 1 .61-1.371l7.601 3.381 7.768-3.752a.75.75 0 0 1 1.001.349" clip-rule="evenodd"/>
  </svg>
`;
export default Layer;
