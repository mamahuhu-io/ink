import { html } from 'lit';
const TreePanel =
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
    <path fill='currentColor' fill-rule="evenodd" d="M7.623 6.87a.503.503 0 0 0 .016.694l.73.73a.503.503 0 0 1 0 .712l-2.803 2.803a.503.503 0 0 0 .242.846l.659.152a.503.503 0 0 1 .26.827L4.26 16.36a.503.503 0 0 0 .373.84H11.1V21a.95.95 0 0 0 1.9 0v-3.8h6.467a.503.503 0 0 0 .373-.84l-2.466-2.726a.503.503 0 0 1 .26-.827l.658-.152a.503.503 0 0 0 .242-.846l-2.803-2.803a.503.503 0 0 1 0-.712l.73-.73a.503.503 0 0 0 .017-.694l-4.056-4.46a.503.503 0 0 0-.744 0z" clip-rule="evenodd"/>
  </svg>
`;
export default TreePanel;
