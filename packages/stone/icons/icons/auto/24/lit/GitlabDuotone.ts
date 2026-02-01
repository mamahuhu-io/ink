import { html } from 'lit';
const GitlabDuotone = ({
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
    <path fill="#E24329" d="m11.856 20.423 3.367-10.363H8.49z" />
    <path fill="#FC6D26" d="M11.856 20.423 8.488 10.06H3.77z" />
    <path fill="#FCA326" d="m3.77 10.06-1.024 3.15a.7.7 0 0 0 .253.779l8.857 6.434z" />
    <path fill="#E24329" d="M3.769 10.06h4.72L6.46 3.818a.349.349 0 0 0-.663 0z" />
    <path fill="#FC6D26" d="m11.856 20.423 3.367-10.363h4.72z" />
    <path fill="#FCA326" d="m19.943 10.06 1.023 3.15a.7.7 0 0 1-.253.779l-8.857 6.434z" />
    <path fill="#E24329" d="M19.943 10.06h-4.72l2.028-6.242a.349.349 0 0 1 .663 0z" />
  </svg>
`;
export default GitlabDuotone;
