import { html } from 'lit';
const BulletedList01 = ({
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
    <circle cx="7" cy="12" r="3" fill="currentColor" />
  </svg>
`;
export default BulletedList01;
