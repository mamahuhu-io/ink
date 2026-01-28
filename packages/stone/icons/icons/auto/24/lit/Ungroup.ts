import { html } from 'lit';
const Ungroup = ({
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
      d="M5.286 4.75c-.346 0-.536.25-.536.45v3.6c0 .2.19.45.536.45h6.428c.346 0 .536-.25.536-.45V5.2c0-.2-.19-.45-.536-.45zM3.25 5.2c0-1.125.961-1.95 2.036-1.95h6.428c1.075 0 2.036.825 2.036 1.95v3.6c0 1.125-.961 1.95-2.036 1.95H5.286c-1.075 0-2.036-.825-2.036-1.95zM12.286 14.75c-.346 0-.536.25-.536.45v3.6c0 .2.19.45.536.45h6.428c.346 0 .536-.25.536-.45v-3.6c0-.2-.19-.45-.536-.45zm-2.036.45c0-1.125.961-1.95 2.036-1.95h6.428c1.075 0 2.036.825 2.036 1.95v3.6c0 1.125-.961 1.95-2.036 1.95h-6.428c-1.075 0-2.036-.825-2.036-1.95z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Ungroup;
