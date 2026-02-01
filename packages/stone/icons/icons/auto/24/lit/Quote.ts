import { html } from 'lit';
const Quote = ({
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
      d="M5 10.966v4.095c0 .565.458 1.024 1.024 1.024h4.095c.566 0 1.024-.459 1.024-1.024v-4.095c0-.566-.459-1.024-1.024-1.024H6.704A3.35 3.35 0 0 1 9.845 7.75v-1.5A4.845 4.845 0 0 0 5 10.966m8 0v4.095c0 .565.458 1.024 1.024 1.024h4.095c.566 0 1.024-.459 1.024-1.024v-4.095c0-.566-.459-1.024-1.024-1.024h-3.415a3.35 3.35 0 0 1 3.141-2.192v-1.5A4.845 4.845 0 0 0 13 10.966"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Quote;
