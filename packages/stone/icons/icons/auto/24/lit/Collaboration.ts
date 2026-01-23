import { html } from 'lit';
const Collaboration =
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
    <path fill='currentColor' fill-rule="evenodd" d="M12 5.55a1.95 1.95 0 1 0 0 3.9 1.95 1.95 0 0 0 0-3.9M8.55 7.5a3.45 3.45 0 1 1 6.9 0 3.45 3.45 0 0 1-6.9 0M5.7 9.15a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1M3.15 10.2a2.55 2.55 0 1 1 5.1 0 2.55 2.55 0 0 1-5.1 0M18.3 9.15a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1m-2.55 1.05a2.55 2.55 0 1 1 5.1 0 2.55 2.55 0 0 1-5.1 0M12 13.65a3.75 3.75 0 0 0-3.75 3.75v1.05h7.5V17.4A3.752 3.752 0 0 0 12 13.65m5.25 4.8h2.85a.15.15 0 0 0 .15-.15v-.9a1.95 1.95 0 0 0-3.213-1.485c.139.471.213.97.213 1.485zm-.857-3.925A5.25 5.25 0 0 0 12 12.15a5.25 5.25 0 0 0-4.393 2.375A3.45 3.45 0 0 0 2.25 17.4v.9c0 .911.739 1.65 1.65 1.65h16.2a1.65 1.65 0 0 0 1.65-1.65v-.9a3.45 3.45 0 0 0-5.357-2.875m-9.43 1.39A1.95 1.95 0 0 0 3.75 17.4v.9c0 .083.067.15.15.15h2.85V17.4c0-.515.074-1.014.213-1.485" clip-rule="evenodd"/>
  </svg>
`;
export default Collaboration;
