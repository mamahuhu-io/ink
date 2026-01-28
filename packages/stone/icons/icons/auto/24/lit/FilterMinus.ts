import { html } from 'lit';
const FilterMinus = ({
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
      d="M3.75 11.526a7.776 7.776 0 0 1 15.553 0 .75.75 0 0 0 1.5 0q0-.522-.057-1.03c-.513-4.638-4.444-8.246-9.22-8.246a9.276 9.276 0 0 0-9.276 9.276c0 4.776 3.608 8.707 8.247 9.22q.507.057 1.03.057a.75.75 0 0 0 0-1.5 7.778 7.778 0 0 1-7.776-7.776m3.987-3.118a.75.75 0 1 0 0 1.5h6.847a.75.75 0 0 0 0-1.5zM7.934 12a.75.75 0 0 1 .75-.75H13.5a.75.75 0 0 1 0 1.5H8.684a.75.75 0 0 1-.75-.75m2.645 2.092a.75.75 0 1 0 0 1.5h.826a.75.75 0 0 0 0-1.5zM15.85 17.5a.65.65 0 0 1 .65-.65h1.979a.65.65 0 1 1 0 1.3H16.5a.65.65 0 0 1-.65-.65m-1.7 0a3.35 3.35 0 1 1 6.7 0 3.35 3.35 0 0 1-6.7 0m3.35-4.65a4.65 4.65 0 1 0 0 9.3 4.65 4.65 0 0 0 0-9.3"
      clip-rule="evenodd"
    />
  </svg>
`;
export default FilterMinus;
