import { html } from 'lit';
const NoNetwork =
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
    <path fill='currentColor' fill-rule="evenodd" d="M5.06 4.185A.75.75 0 0 0 4 5.246l1.398 1.399a14.1 14.1 0 0 0-3.212 2.41.75.75 0 0 0 1.06 1.06 12.6 12.6 0 0 1 3.263-2.36l2.24 2.242a9.6 9.6 0 0 0-3.414 2.207.75.75 0 1 0 1.061 1.06 8.1 8.1 0 0 1 3.54-2.08l2.467 2.466A5.64 5.64 0 0 0 8.17 15.3a.75.75 0 1 0 1.061 1.06 4.15 4.15 0 0 1 5.869 0 1 1 0 0 0 .092.08l2.744 2.742a.75.75 0 0 0 1.06-1.06zm4.492 2.507c4.035-.85 8.402.292 11.533 3.423a.75.75 0 0 0 1.06-1.06 14.1 14.1 0 0 0-12.902-3.83.75.75 0 0 0 .31 1.467m3.752 2.75a.75.75 0 0 0-.176 1.49 8.12 8.12 0 0 1 4.807 2.333.75.75 0 0 0 1.06-1.06 9.62 9.62 0 0 0-5.691-2.763m-1.139 8.842a.75.75 0 1 0 0 1.5h.01a.75.75 0 0 0 0-1.5z" clip-rule="evenodd"/>
  </svg>
`;
export default NoNetwork;
