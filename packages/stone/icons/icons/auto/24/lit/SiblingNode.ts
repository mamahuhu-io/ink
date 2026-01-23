import { html } from 'lit';
const SiblingNode =
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
    <path fill='currentColor' fill-rule="evenodd" d="M10.35 7.25a2.5 2.5 0 0 1 2.4-1.8h5.5a2.5 2.5 0 0 1 0 5h-5.5c-1.1 0-2.036-.712-2.37-1.7H7.237c.47.627.75 1.406.75 2.25v2a2.25 2.25 0 0 0 2.25 2.25h.113a2.5 2.5 0 0 1 2.401-1.8h5.5a2.5 2.5 0 1 1 0 5h-5.5c-1.1 0-2.036-.712-2.37-1.7h-.145A3.75 3.75 0 0 1 6.485 13v-2a2.25 2.25 0 0 0-2.25-2.25H2v-1.5zm2.4-.3a1 1 0 1 0 0 2h5.5a1 1 0 1 0 0-2zm0 8a1 1 0 1 0 0 2h5.5a1 1 0 0 0 0-2z" clip-rule="evenodd"/>
  </svg>
`;
export default SiblingNode;
