import { html } from 'lit';
const FileIconTiff =
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
    <path fill="#fff" d="M4.2 2.4A2.4 2.4 0 0 1 6.6 0h9.6c.192 0 .376.076.512.212l6.476 6.476c.136.136.212.32.212.512v14.4A2.4 2.4 0 0 1 21 24H6.6a2.4 2.4 0 0 1-2.4-2.4z"/><path fill="#CDCDCD" fill-rule="evenodd" d="M6.6 23.1H21a1.5 1.5 0 0 0 1.5-1.5V7.273L16.127.9H6.6a1.5 1.5 0 0 0-1.5 1.5v19.2a1.5 1.5 0 0 0 1.5 1.5M6.6 0a2.4 2.4 0 0 0-2.4 2.4v19.2A2.4 2.4 0 0 0 6.6 24H21a2.4 2.4 0 0 0 2.4-2.4V7.2a.72.72 0 0 0-.212-.512L16.712.212A.72.72 0 0 0 16.2 0z" clip-rule="evenodd"/><path fill="#CDCDCD" fill-rule="evenodd" d="M15.75 4.8V.3h.9v4.5a1.95 1.95 0 0 0 1.95 1.95h4.5v.9h-4.5a2.85 2.85 0 0 1-2.85-2.85" clip-rule="evenodd"/><rect width="16.8" height="9.6" x=".6" y="10.8" fill="#6E52DF" rx="1.2"/><path fill="#fff" d="M2.759 14.397v-.76h3.583v.76H5.006V18h-.912v-3.603zM7.855 13.636V18h-.922v-4.364zM8.614 18v-4.364h2.89v.761H9.536v1.04h1.775v.76H9.537V18zM12.124 18v-4.364h2.89v.761h-1.967v1.04h1.774v.76h-1.774V18z"/>
  </svg>
`;
export default FileIconTiff;
