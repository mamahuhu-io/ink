import { html } from 'lit';
const RotateAnticlockwise =
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
    <path fill='currentColor' fill-rule="evenodd" d="M12.631 5.357a7.012 7.012 0 0 0-6.57 9.467l.794-2.327a.679.679 0 1 1 1.284.438l-1.225 3.592a.68.68 0 0 1-.861.424L2.46 15.725a.679.679 0 0 1 .438-1.284l1.805.616a8.369 8.369 0 1 1 7.928 5.681.679.679 0 0 1 0-1.357 7.012 7.012 0 1 0 0-14.024" clip-rule="evenodd"/>
  </svg>
`;
export default RotateAnticlockwise;
