import { html } from 'lit';
const ForwardPanel = ({
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
      d="M4.5 6.227v11.546c0 .863 1.02 1.32 1.664.747l5.336-4.742v3.995c0 .863 1.02 1.32 1.664.747l6.495-5.773a1 1 0 0 0 0-1.494l-6.495-5.774c-.644-.573-1.664-.115-1.664.748v3.995L6.164 5.48C5.52 4.906 4.5 5.364 4.5 6.227"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ForwardPanel;
