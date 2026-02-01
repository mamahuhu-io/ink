import { html } from 'lit';
const Figma = ({
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
      stroke="currentColor"
      stroke-width="2"
      d="M11.836 15.669v3.417a3.42 3.42 0 0 1-3.418 3.417 3.418 3.418 0 0 1 0-6.834m3.418 0H8.418m3.418 0V8.834M8.418 15.67a3.418 3.418 0 0 1 0-6.835m0 0h3.418m-3.418 0a3.418 3.418 0 0 1 0-6.834h3.418m0 6.834V2m0 6.834h3.417M11.836 2h3.417a3.42 3.42 0 0 1 3.417 3.417 3.42 3.42 0 0 1-3.417 3.417m0 0a3.418 3.418 0 1 0 3.417 3.417 3.42 3.42 0 0 0-3.417-3.417Z"
    />
  </svg>
`;
export default Figma;
