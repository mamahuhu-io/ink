import { html } from 'lit';
const CubePanel = ({
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
      d="M11.553 3.106a1 1 0 0 1 .894 0l7.135 3.567a1 1 0 0 1 .553.895v9.81a1 1 0 0 1-.6.916l-7.134 3.122a1 1 0 0 1-.802 0l-7.135-3.122a1 1 0 0 1-.6-.916v-9.81a1 1 0 0 1 .554-.895zm-5.688 6.08v7.538L11 18.971v-7.218zM13 11.753v7.218l5.135-2.247V9.186zm3.899-4.185-4.9 2.45-4.898-2.45L12 5.118z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default CubePanel;
