import { html } from 'lit';
const BulletedList03 =
  ({ width = '1em', height = '1em', style = '' }: { width?: string, height?: string, style?: string } = {}) =>
    html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width=${width}
    height=${height}
    fill="none"
    style=${'user-select:none;flex-shrink:0;' + style}
  >
    <path fill='currentColor' d="M6.408 9.245a.837.837 0 0 1 1.184 0l2.163 2.163a.837.837 0 0 1 0 1.184l-2.163 2.163a.837.837 0 0 1-1.184 0l-2.163-2.163a.837.837 0 0 1 0-1.184z"/>
  </svg>
`;
export default BulletedList03;
