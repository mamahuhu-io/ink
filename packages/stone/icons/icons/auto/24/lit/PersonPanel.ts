import { html } from 'lit';
const PersonPanel =
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
    <path fill='currentColor' d="M12 3a4.026 4.026 0 1 0 0 8.053A4.026 4.026 0 0 0 12 3M12 12.395c-4.13 0-7.02 3.05-7.379 6.871A.67.67 0 0 0 5.29 20h13.422a.67.67 0 0 0 .668-.734c-.36-3.82-3.249-6.871-7.379-6.871"/>
  </svg>
`;
export default PersonPanel;
