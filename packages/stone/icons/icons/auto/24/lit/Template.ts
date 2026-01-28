import { html } from 'lit';
const Template = ({
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
      d="M4.5 7.25A2.25 2.25 0 0 0 2.25 9.5v9a2.25 2.25 0 0 0 2.25 2.25h13.36a2.25 2.25 0 0 0 2.168-1.648l1.667-6a2.25 2.25 0 0 0-1.05-2.556q.105-.508.105-1.046a5.25 5.25 0 0 0-8.586-4.054l-.91-1.874c-.45-.927-1.765-.942-2.236-.026L7.114 7.25zm0 1.5a.75.75 0 0 0-.75.75v4.998l.722-2.6c.146-.524.47-.962.896-1.254l.974-1.894zm-.25 9.55a.75.75 0 0 0 .723.95H17.86a.75.75 0 0 0 .723-.55l1.167-4.202.5-1.797a.746.746 0 0 0-.5-.917.8.8 0 0 0-.223-.034H6.64a.75.75 0 0 0-.723.55l-.393 1.416zm5.874-13.623.22.455.741 1.525.288.593.548 1.128.18.372.73 1.5H7.257l.771-1.5.771-1.5zM18.75 7.63a3.748 3.748 0 0 0-5.904-.78l.194.4.728 1.5.729 1.5h4.677a3.77 3.77 0 0 0-.424-2.62"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Template;
