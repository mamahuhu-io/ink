import { html } from 'lit';
const LinkBlock =
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
    <path fill='currentColor' d="M18.428 5.572a2.806 2.806 0 0 0-3.967 0l-.978.977a.75.75 0 0 1-1.06-1.06l.977-.978a4.305 4.305 0 1 1 6.089 6.089l-2.333 2.333-1.414-.707 2.686-2.687a2.806 2.806 0 0 0 0-3.967M8 20.727v-1.512a2.806 2.806 0 0 1-2.428-4.754l3.555-3.556a2.806 2.806 0 0 1 3.963-.005l.436.218a.749.749 0 0 0 .63-1.274 4.306 4.306 0 0 0-6.09 0L4.512 13.4A4.305 4.305 0 0 0 8 20.727"/><path fill='currentColor' fill-rule="evenodd" d="M13.519 12.363c-.2-.1-.437-.1-.638 0l-3.8 1.9a.71.71 0 0 0-.393.637v4.75c0 .27.152.517.393.637l3.8 1.9c.201.1.437.1.638 0l3.8-1.9a.71.71 0 0 0 .393-.637V14.9a.71.71 0 0 0-.393-.637zm-1.031 4.877-2.375-1.187v3.157l2.375 1.187zm3.8 1.97-2.376 1.187V17.24l2.376-1.187zm-.881-4.31L13.2 16.003 10.993 14.9l2.207-1.103z" clip-rule="evenodd"/>
  </svg>
`;
export default LinkBlock;
