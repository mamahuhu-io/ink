import { html } from 'lit';
const Cloudy2Panel = ({
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
      d="M5.478 18a3.478 3.478 0 1 1 0-6.956 4.348 4.348 0 0 1 8.613-.85 3.044 3.044 0 0 1 2.653 3.51q.228-.051.473-.052a2.174 2.174 0 0 1 0 4.348zM20.5 10A3 3 0 0 1 18 12.96a4 4 0 0 0-3.347-3.906A3.001 3.001 0 0 1 20.5 10"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Cloudy2Panel;
