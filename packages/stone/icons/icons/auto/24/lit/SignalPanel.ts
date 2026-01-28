import { html } from 'lit';
const SignalPanel = ({
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
      d="M16.5 4.5a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5zM10 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm-6 4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-3A.5.5 0 0 1 4 19z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default SignalPanel;
