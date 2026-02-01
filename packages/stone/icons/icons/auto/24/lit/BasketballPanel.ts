import { html } from 'lit';
const BasketballPanel = ({
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
      d="M11.35 4.026a7.96 7.96 0 0 0-4.204 1.615c.863 1.619 1.399 3.586 1.49 5.709h2.714zm0 8.624H8.636c-.091 2.123-.627 4.09-1.49 5.71a7.96 7.96 0 0 0 4.204 1.614zm1.3 7.324V12.65h2.714c.091 2.123.627 4.09 1.49 5.71a7.96 7.96 0 0 1-4.204 1.614m0-8.624V4.026a7.96 7.96 0 0 1 4.204 1.615c-.863 1.619-1.399 3.586-1.49 5.709zM6.148 6.545a7.97 7.97 0 0 0-2.122 4.805h3.309C7.25 9.555 6.82 7.91 6.148 6.545m0 10.91a7.97 7.97 0 0 1-2.122-4.805h3.309c-.085 1.795-.515 3.44-1.187 4.805m11.704 0c-.671-1.364-1.102-3.01-1.187-4.805h3.31a7.97 7.97 0 0 1-2.123 4.805m-1.187-6.105h3.31a7.97 7.97 0 0 0-2.123-4.805c-.671 1.365-1.102 3.01-1.187 4.805"
      clip-rule="evenodd"
    />
  </svg>
`;
export default BasketballPanel;
