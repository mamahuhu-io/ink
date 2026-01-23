import { html } from 'lit';
const BulletedList04 =
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
    <path fill='currentColor' fill-rule="evenodd" d="M9.163 12 7 9.837 4.837 12 7 14.163zM7.592 9.245a.837.837 0 0 0-1.184 0l-2.163 2.163a.837.837 0 0 0 0 1.184l2.163 2.163a.837.837 0 0 0 1.184 0l2.163-2.163a.837.837 0 0 0 0-1.184z" clip-rule="evenodd"/>
  </svg>
`;
export default BulletedList04;
