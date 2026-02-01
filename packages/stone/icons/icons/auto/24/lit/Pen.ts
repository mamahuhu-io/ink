import { html } from 'lit';
const Pen = ({
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
      d="M19.279 4.721a1.614 1.614 0 0 0-2.28 0l-.885.883 2.278 2.273.887-.885a1.603 1.603 0 0 0 0-2.271M17.33 8.937l-2.277-2.273L4.25 17.445v2.305h2.245zm-1.39-5.278a3.114 3.114 0 0 1 4.398 0 3.103 3.103 0 0 1 0 4.395L7.335 21.03a.75.75 0 0 1-.53.22H3.5a.75.75 0 0 1-.75-.75v-3.367c0-.2.08-.39.22-.53z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Pen;
