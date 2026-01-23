import { html } from 'lit';
const RightBracket =
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
    <path fill='currentColor' fill-rule="evenodd" d="M19.75 3c-.797 0-1.681.263-2.377.686C16.712 4.088 16 4.78 16 5.728V9.5c0 .709-.726 1.488-1.897 1.488a.75.75 0 0 0 0 1.5c1.17 0 1.897.78 1.897 1.487v3.774c0 .945.708 1.642 1.369 2.05.695.429 1.58.7 2.381.7a.75.75 0 0 0 0-1.5c-.498 0-1.113-.18-1.593-.476-.515-.318-.657-.621-.657-.774v-3.774c0-.928-.456-1.708-1.144-2.237.688-.53 1.144-1.309 1.144-2.238V5.728c0-.15.139-.448.652-.76.48-.292 1.096-.468 1.598-.468a.75.75 0 0 0 0-1.5m-15 5a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm.75 3.75a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75M5.25 14a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/>
  </svg>
`;
export default RightBracket;
