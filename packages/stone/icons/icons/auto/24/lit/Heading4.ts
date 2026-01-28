import { html } from 'lit';
const Heading4 = ({
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
      fill="currentColor"
      fill-rule="evenodd"
      d="M18.793 15.755v1.931c0 .552.286.866.79.866.514 0 .8-.314.8-.866v-1.931h.989c.542 0 .847-.267.847-.723 0-.467-.314-.733-.847-.733h-.99V6.696c0-.885-.485-1.38-1.35-1.38-.657 0-1.095.286-1.657 1.114-2.16 3.235-3.016 4.605-4.377 7.013-.333.609-.447.942-.447 1.294 0 .628.495 1.018 1.237 1.018zm0-1.456H14.15v-.095c1.246-2.16 2.94-4.882 4.558-7.27h.085zM2.95 5.705a.73.73 0 0 1 .73.731v5.079h5.855V6.436a.73.73 0 0 1 1.461 0v11.62a.73.73 0 0 1-1.461 0v-5.08H3.68v5.08a.73.73 0 0 1-1.461 0V6.435a.73.73 0 0 1 .73-.73"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Heading4;
