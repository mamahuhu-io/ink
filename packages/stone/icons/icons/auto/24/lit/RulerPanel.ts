import { html } from 'lit';
const RulerPanel = ({
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
      d="M8 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v19a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-.585h4v-1H8v-.846h2.154v-1H8v-.846h2.154v-1H8v-.846h4v-1H8v-.846h2.154v-1H8v-.846h2.154v-1H8v-.847h4v-1H8v-.846h2.154v-1H8v-.846h2.154v-1H8V4.3h4v-1H8z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default RulerPanel;
