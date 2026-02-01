import { html } from 'lit';
const GiftPanel = ({
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
      d="M6.342 5.026A2.526 2.526 0 0 1 8.868 2.5c1.27 0 2.405.576 3.158 1.482A4.1 4.1 0 0 1 15.184 2.5a2.526 2.526 0 0 1 2.527 2.526c0 .814-.237 1.573-.646 2.21h1.593a1.895 1.895 0 0 1 0 3.79h-5.684v-3.79h.631c1.221 0 2.21-.989 2.21-2.21a.63.63 0 0 0-.63-.631c-1.222 0-2.211.99-2.211 2.21v.632h-1.895v-.632c0-1.22-.99-2.21-2.21-2.21a.63.63 0 0 0-.632.631c0 1.221.99 2.21 2.21 2.21h.632v3.79H5.395a1.895 1.895 0 1 1 0-3.79h1.592a4.1 4.1 0 0 1-.645-2.21M12.974 12.921h6.631v4.737a2.84 2.84 0 0 1-2.842 2.842h-3.79zM11.079 12.921H4.447v4.737A2.84 2.84 0 0 0 7.29 20.5h3.79z"
    />
  </svg>
`;
export default GiftPanel;
