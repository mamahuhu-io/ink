import { html } from 'lit';
const Tag = ({
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
      d="M4.564 7.467a3.017 3.017 0 0 1 2.903-2.903l4.606-.17c.323-.013.636.11.864.338l6.647 6.648a1.16 1.16 0 0 1 0 1.64l-6.563 6.564a1.16 1.16 0 0 1-1.641 0l-6.648-6.647a1.16 1.16 0 0 1-.339-.864zm2.851-4.295a4.41 4.41 0 0 0-4.243 4.243l-.17 4.607c-.027.71.244 1.397.746 1.9l6.647 6.647a2.553 2.553 0 0 0 3.61 0l6.564-6.564a2.553 2.553 0 0 0 0-3.61L13.92 3.748a2.55 2.55 0 0 0-1.9-.746zm.847 5.09A.928.928 0 1 0 6.95 6.95a.928.928 0 0 0 1.313 1.313"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Tag;
