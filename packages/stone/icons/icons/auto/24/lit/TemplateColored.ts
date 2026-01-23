import { html } from 'lit';
const TemplateColored =
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
    <path fill="#29A3FA" fill-rule="evenodd" d="M19.563 10.75a4.25 4.25 0 0 0-7.315-3.987l1.937 3.987h5.378" clip-rule="evenodd"/><path fill="#FB7081" fill-rule="evenodd" d="M10.792 4.909a.75.75 0 0 0-1.342-.016l-3.018 5.87q.102-.013.208-.013h6.989z" clip-rule="evenodd"/><path fill="#FCD34D" fill-rule="evenodd" d="M5.436 12.165a1.25 1.25 0 0 1 1.205-.915h12.886a1.25 1.25 0 0 1 1.204 1.585l-1.666 6a1.25 1.25 0 0 1-1.205.915H4.974a1.25 1.25 0 0 1-1.205-1.585z" clip-rule="evenodd"/><path fill="#FCD34D" fill-rule="evenodd" d="m7.162 8.25-1.41 2.743c-.381.224-.673.59-.798 1.039l-1.666 6q-.024.083-.038.164V9.5c0-.69.56-1.25 1.25-1.25z" clip-rule="evenodd"/>
  </svg>
`;
export default TemplateColored;
