import { html } from 'lit';
const FileIconWav =
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
    <path fill="#fff" d="M4.2 2.4A2.4 2.4 0 0 1 6.6 0h9.6c.192 0 .376.076.512.212l6.476 6.476c.136.136.212.32.212.512v14.4A2.4 2.4 0 0 1 21 24H6.6a2.4 2.4 0 0 1-2.4-2.4z"/><path fill="#CDCDCD" fill-rule="evenodd" d="M6.6 23.1H21a1.5 1.5 0 0 0 1.5-1.5V7.273L16.127.9H6.6a1.5 1.5 0 0 0-1.5 1.5v19.2a1.5 1.5 0 0 0 1.5 1.5M6.6 0a2.4 2.4 0 0 0-2.4 2.4v19.2A2.4 2.4 0 0 0 6.6 24H21a2.4 2.4 0 0 0 2.4-2.4V7.2a.72.72 0 0 0-.212-.512L16.712.212A.72.72 0 0 0 16.2 0z" clip-rule="evenodd"/><path fill="#CDCDCD" fill-rule="evenodd" d="M15.75 4.8V.3h.9v4.5a1.95 1.95 0 0 0 1.95 1.95h4.5v.9h-4.5a2.85 2.85 0 0 1-2.85-2.85" clip-rule="evenodd"/><rect width="18" height="9.6" x=".6" y="10.8" fill="#E660A4" rx="1.2"/><path fill="#fff" d="m4.157 18-1.249-4.364h1.008l.723 3.032h.036l.797-3.032h.863l.794 3.039h.039l.722-3.039h1.008L7.649 18H6.75l-.83-2.853h-.035L5.056 18zM9.704 18h-.988l1.506-4.364h1.189L12.915 18h-.988l-1.093-3.367h-.035zm-.062-1.715h2.336v.72H9.642zM13.684 13.636l1.055 3.316h.04l1.057-3.316h1.023L15.354 18h-1.189l-1.506-4.364z"/>
  </svg>
`;
export default FileIconWav;
