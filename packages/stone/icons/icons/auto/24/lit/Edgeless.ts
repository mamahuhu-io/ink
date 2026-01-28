import { html } from 'lit';
const Edgeless = ({
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
      d="M7.168 4.75a1.868 1.868 0 1 0 0 3.736 1.868 1.868 0 0 0 0-3.736M3.8 6.618a3.368 3.368 0 0 1 6.729-.226c.842 0 1.651.014 2.493.217.933.226 1.865.672 2.975 1.504l.02.015.02.017c1.566 1.35 2.35 3.533 2.354 5.578h1.66a.75.75 0 0 1 .75.75v4.713a.75.75 0 0 1-.75.75h-4.714a.75.75 0 0 1-.75-.75v-4.713a.75.75 0 0 1 .75-.75h1.554c-.004-1.705-.663-3.42-1.815-4.426-.975-.728-1.719-1.064-2.406-1.23-.712-.172-1.407-.175-2.36-.175v-.057a3.38 3.38 0 0 1-2.392 2.068v3.904a3.37 3.37 0 0 1-.75 6.652 3.368 3.368 0 0 1-.75-6.652V9.903A3.37 3.37 0 0 1 3.8 6.618m3.368 8.605a1.868 1.868 0 1 0 0 3.736 1.868 1.868 0 0 0 0-3.736m8.92 3.213v-3.213H19.3v3.213z"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Edgeless;
