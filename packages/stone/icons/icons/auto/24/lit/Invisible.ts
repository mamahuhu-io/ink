import { html } from 'lit';
const Invisible =
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
    <path fill='currentColor' fill-rule="evenodd" d="M4.6 7.55a.75.75 0 0 0-1.2.9 10.8 10.8 0 0 0 2.939 2.69l-1.963 2.944a.75.75 0 0 0 1.248.832l2-3a1 1 0 0 0 .044-.075c1.108.489 2.315.796 3.582.883V17.5a.75.75 0 1 0 1.5 0v-4.776a10.7 10.7 0 0 0 3.582-.883q.02.038.044.075l2 3a.75.75 0 0 0 1.248-.832l-1.962-2.944A10.8 10.8 0 0 0 20.6 8.45a.75.75 0 1 0-1.2-.9 9.24 9.24 0 0 1-7.4 3.7 9.24 9.24 0 0 1-7.402-3.7" clip-rule="evenodd"/>
  </svg>
`;
export default Invisible;
