import { html } from 'lit';
const New =
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
    <path fill='currentColor' fill-rule="evenodd" d="M7.435 5.118a2.868 2.868 0 0 1 4.986-1.934 2.868 2.868 0 0 1 4.639 3.301h2.831c.967 0 1.75.784 1.75 1.75v2.236a1.75 1.75 0 0 1-1.059 1.608V19a2.75 2.75 0 0 1-2.75 2.75H7.01A2.75 2.75 0 0 1 4.259 19v-6.921a1.75 1.75 0 0 1-1.06-1.608V8.235c.001-.966.784-1.75 1.751-1.75h2.832a2.86 2.86 0 0 1-.347-1.367m2.868 1.367h1.367V5.118a1.368 1.368 0 1 0-1.367 1.367m2.867-1.367v1.367h1.368a1.368 1.368 0 1 0-1.367-1.367M4.95 7.985a.25.25 0 0 0-.25.25v2.236c0 .138.112.25.25.25H19.89a.25.25 0 0 0 .25-.25V8.235a.25.25 0 0 0-.25-.25zm.809 4.236V19c0 .69.56 1.25 1.25 1.25h4.662v-8.03zm7.412 0v8.029h4.661c.69 0 1.25-.56 1.25-1.25v-6.78z" clip-rule="evenodd"/>
  </svg>
`;
export default New;
