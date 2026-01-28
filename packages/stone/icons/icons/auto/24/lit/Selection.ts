import { html } from 'lit';
const Selection = ({
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
      d="M6 3.25A2.75 2.75 0 0 0 3.25 6v12A2.75 2.75 0 0 0 6 20.75h5a.75.75 0 0 0 0-1.5H6c-.69 0-1.25-.56-1.25-1.25V6c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v5a.75.75 0 0 0 1.5 0V6A2.75 2.75 0 0 0 18 3.25zm7.939 10.041a.5.5 0 0 0-.648.648l2.957 7.556a.5.5 0 0 0 .936-.012l1.061-2.937a.5.5 0 0 1 .3-.3l2.938-1.062a.5.5 0 0 0 .012-.936z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Selection;
