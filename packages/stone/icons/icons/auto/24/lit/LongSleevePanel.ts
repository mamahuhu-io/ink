import { html } from 'lit';
const LongSleevePanel = ({
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
      d="M7.393 20.324v-8.99l-2.472 6.068L2 16.054 6.21 5.203c.589-1.515 2.854-1.555 3.962-.367.574.617 1.2 1.054 1.828 1.101.628-.047 1.254-.484 1.828-1.1 1.108-1.19 3.373-1.149 3.961.366L22 16.053l-2.921 1.35-2.472-6.068v8.988H7.393"
      clip-rule="evenodd"
    />
  </svg>
`;
export default LongSleevePanel;
