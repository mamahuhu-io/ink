import { html } from 'lit';
const GooglePanel = ({
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
      d="M19.844 10.35H12v3.2h4.521a4.798 4.798 0 0 1-9.321-1.6 4.8 4.8 0 0 1 4.8-4.8c1.224 0 2.337.462 3.184 1.216l2.263-2.263A7.96 7.96 0 0 0 12 3.95a8 8 0 1 0 8 8c0-.536-.055-1.093-.156-1.6"
    />
  </svg>
`;
export default GooglePanel;
