import { html } from 'lit';
const Favorited = ({
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
      d="M13.638 3.22c-.57-1.51-2.707-1.51-3.276 0l-1.56 4.144a.25.25 0 0 1-.223.162l-4.423.203c-1.613.075-2.273 2.107-1.012 3.116l3.459 2.764a.25.25 0 0 1 .085.262l-1.173 4.27c-.428 1.556 1.3 2.812 2.65 1.925l3.698-2.435a.25.25 0 0 1 .274 0l3.699 2.435c1.348.887 3.077-.369 2.65-1.926l-1.174-4.27a.25.25 0 0 1 .085-.26l3.459-2.765c1.261-1.009.6-3.041-1.012-3.116l-4.423-.203a.25.25 0 0 1-.223-.162z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Favorited;
