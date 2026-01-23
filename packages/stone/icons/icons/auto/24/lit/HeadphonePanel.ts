import { html } from 'lit';
const HeadphonePanel =
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
    <path fill='currentColor' d="M4.889 11.5a6.611 6.611 0 1 1 13.222 0v.944h-1.889a1.89 1.89 0 0 0-1.889 1.89v3.777c0 1.043.846 1.889 1.89 1.889h1.888A1.89 1.89 0 0 0 20 18.111V11.5a8.5 8.5 0 0 0-7.556-8.448V3H11.5A8.5 8.5 0 0 0 3 11.5v6.611C3 19.154 3.846 20 4.889 20h1.889a1.89 1.89 0 0 0 1.889-1.889v-3.778a1.89 1.89 0 0 0-1.89-1.889H4.89z"/>
  </svg>
`;
export default HeadphonePanel;
