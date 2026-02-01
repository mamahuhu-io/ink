import { html } from 'lit';
const SelectText = ({
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
      d="M12 3a.657.657 0 0 0 0 1.317h2.625v15.366H12A.657.657 0 0 0 12 21h6.563a.657.657 0 0 0 0-1.317h-2.625V4.317h2.624a.657.657 0 0 0 0-1.317zM5 7.39a.44.44 0 0 0-.437.44v8.78c0 .242.195.439.437.439h7.656a.657.657 0 0 1 0 1.317H5c-.966 0-1.75-.786-1.75-1.756V7.83c0-.97.784-1.757 1.75-1.757h7.656a.657.657 0 0 1 0 1.317zm14 9.659a.44.44 0 0 0 .438-.44V7.83A.44.44 0 0 0 19 7.39h-1.094a.657.657 0 0 1 0-1.317H19c.966 0 1.75.786 1.75 1.756v8.78c0 .97-.784 1.757-1.75 1.757h-1.094a.657.657 0 0 1 0-1.317z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default SelectText;
