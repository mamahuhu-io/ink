import { html } from 'lit';
const Folder3Panel = ({
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
      d="M4 4v4h17V6a1 1 0 0 0-1-1h-8L9.774 3.22A1 1 0 0 0 9.149 3H5a1 1 0 0 0-1 1m0 5.5h17V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm9.404 3.888a1.373 1.373 0 0 1 2.216.44l.055.127.046-.102a1.362 1.362 0 0 1 2.218-.388 1.634 1.634 0 0 1-.034 2.31l-2.127 2.065a.25.25 0 0 1-.353-.005l-2.056-2.117a1.647 1.647 0 0 1 .035-2.33"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Folder3Panel;
