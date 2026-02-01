import { html } from 'lit';
const TextType = ({
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
      d="M8.667 4.707c-.73 0-1.381.462-1.622 1.15l-2.286 6.531-.329.94-1.325 3.786a.886.886 0 1 0 1.672.585l1.118-3.193h5.543l1.118 3.193a.886.886 0 1 0 1.672-.585l-1.325-3.787-.329-.939-2.285-6.53a1.72 1.72 0 0 0-1.622-1.151m0 1.88 2.15 6.147H6.516zm4.363-1.67a.805.805 0 1 0 0 1.61h7.22a.805.805 0 0 0 0-1.61zm1.805 5.887a.805.805 0 1 0 0 1.61h5.415a.805.805 0 0 0 0-1.61zm.398 6.692c0-.445.36-.805.805-.805h4.212a.805.805 0 0 1 0 1.61h-4.212a.805.805 0 0 1-.805-.805"
      clip-rule="evenodd"
    />
  </svg>
`;
export default TextType;
