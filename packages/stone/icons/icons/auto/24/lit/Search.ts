import { html } from 'lit';
const Search = ({
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
      d="M3.75 9.5a5.75 5.75 0 1 1 11.5 0 5.75 5.75 0 0 1-11.5 0M9.5 2.25a7.25 7.25 0 1 0 4.569 12.88l5.4 5.4a.75.75 0 1 0 1.061-1.06l-5.4-5.401A7.25 7.25 0 0 0 9.5 2.25"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Search;
