import { html } from 'lit';
const FileIconJava =
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
    <path fill="#fff" d="M4.2 2.4A2.4 2.4 0 0 1 6.6 0h9.6c.192 0 .376.076.512.212l6.476 6.476c.136.136.212.32.212.512v14.4A2.4 2.4 0 0 1 21 24H6.6a2.4 2.4 0 0 1-2.4-2.4z"/><path fill="#CDCDCD" fill-rule="evenodd" d="M6.6 23.1H21a1.5 1.5 0 0 0 1.5-1.5V7.273L16.127.9H6.6a1.5 1.5 0 0 0-1.5 1.5v19.2a1.5 1.5 0 0 0 1.5 1.5M6.6 0a2.4 2.4 0 0 0-2.4 2.4v19.2A2.4 2.4 0 0 0 6.6 24H21a2.4 2.4 0 0 0 2.4-2.4V7.2a.72.72 0 0 0-.212-.512L16.712.212A.72.72 0 0 0 16.2 0z" clip-rule="evenodd"/><path fill="#CDCDCD" fill-rule="evenodd" d="M15.75 4.8V.3h.9v4.5a1.95 1.95 0 0 0 1.95 1.95h4.5v.9h-4.5a2.85 2.85 0 0 1-2.85-2.85" clip-rule="evenodd"/><rect width="19.8" height="9.6" x=".6" y="10.8" fill="#0077CB" rx="1.2"/><path fill="#fff" d="M4.645 13.636h.912v3.043q0 .422-.19.733a1.25 1.25 0 0 1-.521.48 1.7 1.7 0 0 1-.778.168q-.394 0-.716-.139a1.14 1.14 0 0 1-.507-.426q-.188-.288-.185-.722h.918a.66.66 0 0 0 .07.296q.069.12.186.187.12.064.281.064.171 0 .288-.072.12-.075.18-.218a.9.9 0 0 0 .062-.351zM7.072 18h-.988l1.506-4.364H8.78L10.283 18h-.988l-1.093-3.367h-.034zm-.061-1.715h2.335v.72H7.01zM11.052 13.636l1.055 3.316h.04l1.057-3.316h1.023L12.722 18h-1.189l-1.506-4.364zM14.924 18h-.989l1.507-4.364h1.189L18.135 18h-.989l-1.093-3.367h-.034zm-.062-1.715h2.335v.72h-2.335z"/>
  </svg>
`;
export default FileIconJava;
