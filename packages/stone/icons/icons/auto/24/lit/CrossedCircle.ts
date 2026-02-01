import { html } from 'lit';
const CrossedCircle = ({
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
      d="M5.41 6.47a8.22 8.22 0 0 0-1.91 5.28c0 2.008.717 3.849 1.91 5.28l5.28-5.28zm1.06-1.06 5.28 5.28 5.28-5.28a8.22 8.22 0 0 0-5.28-1.91 8.22 8.22 0 0 0-5.28 1.91m11.62 1.06-5.28 5.28 5.28 5.28A8.22 8.22 0 0 0 20 11.75a8.22 8.22 0 0 0-1.91-5.28m-1.06 11.62-5.28-5.28-5.28 5.28A8.22 8.22 0 0 0 11.75 20a8.22 8.22 0 0 0 5.28-1.91M2 11.75C2 6.365 6.365 2 11.75 2s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2 17.135 2 11.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default CrossedCircle;
