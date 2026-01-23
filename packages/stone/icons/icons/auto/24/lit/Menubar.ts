import { html } from 'lit';
const Menubar =
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
    <path fill='currentColor' fill-rule="evenodd" d="m8.717 14.427 2.197-6.216c.105-.301.236-.531.42-.685.186-.157.416-.226.7-.226.283 0 .513.067.7.223.182.154.312.385.414.688l2.198 6.218c.065.197.104.367.104.53a.65.65 0 0 1-.206.493.77.77 0 0 1-.527.18.72.72 0 0 1-.501-.172c-.134-.119-.227-.297-.297-.53l-.528-1.582h-2.75l-.528 1.582c-.072.236-.164.414-.295.532a.7.7 0 0 1-.497.17.77.77 0 0 1-.515-.175.63.63 0 0 1-.206-.48c0-.158.04-.323.117-.549m2.306-2.299h1.987l-.991-3.056z" clip-rule="evenodd"/><path fill='currentColor' fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm2-.5h14a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5" clip-rule="evenodd"/>
  </svg>
`;
export default Menubar;
