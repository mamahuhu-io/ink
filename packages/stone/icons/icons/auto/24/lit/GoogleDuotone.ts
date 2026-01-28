import { html } from 'lit';
const GoogleDuotone = ({
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
      fill="#FFC107"
      d="M21.56 10.05H12v3.9h5.51A5.848 5.848 0 0 1 6.15 12 5.85 5.85 0 0 1 12 6.15c1.491 0 2.848.563 3.881 1.482l2.758-2.758A9.7 9.7 0 0 0 12 2.25c-5.384 0-9.75 4.366-9.75 9.75s4.366 9.75 9.75 9.75 9.75-4.366 9.75-9.75c0-.654-.067-1.332-.19-1.95"
    />
    <path
      fill="#FF3D00"
      d="m3.374 7.462 3.203 2.35A5.85 5.85 0 0 1 12 6.15c1.491 0 2.848.563 3.881 1.482l2.758-2.758A9.7 9.7 0 0 0 12 2.25a9.74 9.74 0 0 0-8.626 5.212"
    />
    <path
      fill="#4CAF50"
      d="M12 21.75a9.7 9.7 0 0 0 6.537-2.531l-3.018-2.554A5.8 5.8 0 0 1 12 17.85a5.85 5.85 0 0 1-5.5-3.874l-3.18 2.45C4.934 19.584 8.21 21.75 12 21.75"
    />
    <path
      fill="#1976D2"
      d="M21.56 10.05H12v3.9h5.51a5.87 5.87 0 0 1-1.992 2.716h.001l3.018 2.553c-.213.194 3.213-2.344 3.213-7.219 0-.654-.067-1.332-.19-1.95"
    />
  </svg>
`;
export default GoogleDuotone;
