import { html } from 'lit';
const Updated =
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
    <path fill='currentColor' fill-rule="evenodd" d="M8 2.75a.75.75 0 0 1 .75.75v.75h6.5V3.5a.75.75 0 0 1 1.5 0v.75H19A2.75 2.75 0 0 1 21.75 7v5a.75.75 0 0 1-1.5 0v-1.75H3.75V19c0 .69.56 1.25 1.25 1.25h7a.75.75 0 0 1 0 1.5H5A2.75 2.75 0 0 1 2.25 19V7A2.75 2.75 0 0 1 5 4.25h2.25V3.5A.75.75 0 0 1 8 2.75m7.25 3v.75a.75.75 0 0 0 1.5 0v-.75H19c.69 0 1.25.56 1.25 1.25v1.75H3.75V7c0-.69.56-1.25 1.25-1.25h2.25v.75a.75.75 0 0 0 1.5 0v-.75z" clip-rule="evenodd"/><path fill='currentColor' d="M15.434 15.593a3.03 3.03 0 0 1 5.253 1.188.75.75 0 0 0 1.453-.374 4.53 4.53 0 0 0-8.128-1.418l-.596-.252a.3.3 0 0 0-.41.337l.483 2.329a.3.3 0 0 0 .454.193l2.01-1.272a.3.3 0 0 0-.043-.53zM17.534 21.008c.931 0 1.765-.42 2.32-1.082l-.476-.202a.3.3 0 0 1-.043-.53l2.01-1.272a.3.3 0 0 1 .454.193l.485 2.329a.3.3 0 0 1-.411.337l-.596-.252a4.52 4.52 0 0 1-3.743 1.979 4.525 4.525 0 0 1-4.385-3.397.75.75 0 0 1 1.453-.374 3.025 3.025 0 0 0 2.933 2.27"/>
  </svg>
`;
export default Updated;
