import { html } from 'lit';
const FacebookDuotone = ({
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
      fill="#1877F2"
      d="M22 12.06C22 6.505 17.523 2 12 2S2 6.504 2 12.06c0 5.024 3.656 9.185 8.438 9.94v-7.03h-2.54v-2.91h2.54V9.845c0-2.52 1.492-3.914 3.777-3.914 1.094 0 2.238.197 2.238.197v2.475h-1.262c-1.242 0-1.629.777-1.629 1.572v1.887h2.774l-.443 2.908h-2.33V22c4.78-.755 8.437-4.916 8.437-9.94"
    />
  </svg>
`;
export default FacebookDuotone;
