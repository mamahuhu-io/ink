import { html } from 'lit';
const CommentDuodone =
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
    <path fill="#ED3F3F" d="M21.75 5.25a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/><path fill="#7A7A7A" fill-rule="evenodd" d="M21.302 8.649A9.25 9.25 0 0 1 8.767 19.966l-4.506.75a.85.85 0 0 1-.978-.977l.751-4.506A9.25 9.25 0 0 1 15.351 2.698a4.2 4.2 0 0 0-.682 1.36 7.75 7.75 0 0 0-9.192 10.725.85.85 0 0 1 .07.5l-.635 3.805 3.804-.634a.85.85 0 0 1 .5.068A7.75 7.75 0 0 0 19.942 9.33a4.2 4.2 0 0 0 1.361-.681" clip-rule="evenodd"/>
  </svg>
`;
export default CommentDuodone;
