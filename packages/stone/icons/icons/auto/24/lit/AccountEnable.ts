import { html } from 'lit';
const AccountEnable = ({
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
      d="M11.5 2.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5M8.25 7a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0"
      clip-rule="evenodd"
    />
    <path
      fill="currentColor"
      d="M11.28 14.754a.75.75 0 0 0-.052-1.5 7.75 7.75 0 0 0-7.166 5.561 2.16 2.16 0 0 0 .495 2.102 2.64 2.64 0 0 0 1.943.833h4.754a.75.75 0 0 0 0-1.5H6.5c-.35 0-.654-.146-.837-.346a.67.67 0 0 1-.161-.666 6.25 6.25 0 0 1 5.778-4.484M18.935 15.986a.65.65 0 0 1 0 .92l-2.108 2.108a.65.65 0 0 1-.919 0l-.843-.843a.65.65 0 1 1 .92-.92l.383.384 1.648-1.649a.65.65 0 0 1 .92 0"
    />
    <path
      fill="currentColor"
      fill-rule="evenodd"
      d="M12.35 17.5a4.65 4.65 0 1 1 9.3 0 4.65 4.65 0 0 1-9.3 0M17 14.15a3.35 3.35 0 1 0 0 6.7 3.35 3.35 0 0 0 0-6.7"
      clip-rule="evenodd"
    />
  </svg>
`;
export default AccountEnable;
