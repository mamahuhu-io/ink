import { html } from 'lit';
const GroupPanel = ({
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
      d="M4.37 7.637a3.532 3.532 0 1 1 7.065 0 3.532 3.532 0 0 1-7.065 0M7.84 12.052c3.103 0 6.007 2.555 6.337 7.24a.663.663 0 0 1-.66.708H2.161a.66.66 0 0 1-.66-.709c.33-4.684 3.234-7.239 6.337-7.239M15.85 4.104a3.532 3.532 0 1 0 0 7.065 3.532 3.532 0 0 0 0-7.065M15.498 19.198c.02.275-.018.548-.108.802h6.198a.66.66 0 0 0 .66-.709c-.33-4.684-3.234-7.239-6.337-7.239-1.05 0-2.077.292-2.989.86 1.425 1.468 2.388 3.62 2.576 6.286"
    />
  </svg>
`;
export default GroupPanel;
