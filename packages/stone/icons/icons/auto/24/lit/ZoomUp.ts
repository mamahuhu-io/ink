import { html } from 'lit';
const ZoomUp = ({
  width = '1em',
  height = '1em',
  style = '',
}: { width?: string; height?: string; style?: string } = {}) => html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width=${width}
    height=${height}
    fill="none"
    style=${'user-select:none;flex-shrink:0;' + style}
  >
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M11.115 4.885a6.23 6.23 0 1 0 4.408 10.634 6.23 6.23 0 0 0-4.408-10.634m5.854 11.102a7.615 7.615 0 1 0-.979.98l4.328 4.33a.692.692 0 1 0 .98-.979zm-5.854-8.333c.383 0 .693.31.693.692v2.077h2.077a.692.692 0 1 1 0 1.385h-2.077v2.077a.692.692 0 1 1-1.385 0v-2.077H8.346a.692.692 0 0 1 0-1.385h2.077V8.346c0-.382.31-.692.692-.692"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ZoomUp;
