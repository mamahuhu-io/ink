import { html } from 'lit';
const Zip = ({
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
      d="M3.75 6.5c0-.69.56-1.25 1.25-1.25h4.672c.331 0 .649.132.883.366L11.97 7.03c.14.141.331.22.53.22h1.868v1.956h2v2h-2v2h2v2h-2v2h2v1.044H5c-.69 0-1.25-.56-1.25-1.25zm14.618 11.75v-1.044h-2v-2h2v-2h-2v-2h2v-2h-2V7.25H19c.69 0 1.25.56 1.25 1.25V17c0 .69-.56 1.25-1.25 1.25zM5 3.75A2.75 2.75 0 0 0 2.25 6.5V17A2.75 2.75 0 0 0 5 19.75h14A2.75 2.75 0 0 0 21.75 17V8.5A2.75 2.75 0 0 0 19 5.75h-6.19l-1.194-1.195a2.75 2.75 0 0 0-1.944-.805z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Zip;
