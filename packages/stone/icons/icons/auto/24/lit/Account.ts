import { html } from 'lit';
const Account = ({
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
      d="M12 3.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5M7.25 7a4.75 4.75 0 1 1 9.5 0 4.75 4.75 0 0 1-9.5 0M12 14.75a6.25 6.25 0 0 0-5.998 4.488.67.67 0 0 0 .162.666c.182.2.486.346.836.346h10c.35 0 .654-.146.837-.346a.67.67 0 0 0 .161-.666A6.25 6.25 0 0 0 12 14.75m-7.438 4.065a7.753 7.753 0 0 1 14.876 0 2.16 2.16 0 0 1-.495 2.102A2.64 2.64 0 0 1 17 21.75H7a2.64 2.64 0 0 1-1.943-.833 2.16 2.16 0 0 1-.495-2.102"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Account;
