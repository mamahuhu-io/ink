import { html } from 'lit';
const LightMode = ({
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
      d="M12.75 2.698a.75.75 0 0 0-1.5 0V3.73a.75.75 0 1 0 1.5 0zM5.812 4.75a.75.75 0 0 0-1.06 1.061l.84.842a.75.75 0 0 0 1.061-1.061zm13.437 1.061a.75.75 0 1 0-1.061-1.06l-.841.84a.75.75 0 1 0 1.06 1.062zM2.698 11.25a.75.75 0 0 0 0 1.5H3.73a.75.75 0 0 0 0-1.5zm17.57 0a.75.75 0 0 0 0 1.5h1.034a.75.75 0 0 0 0-1.5zM6.653 18.413a.75.75 0 0 0-1.058-1.063l-.841.837A.75.75 0 0 0 5.81 19.25zm11.754-1.063a.75.75 0 0 0-1.058 1.063l.841.837a.75.75 0 1 0 1.058-1.063zm-5.656 2.919a.75.75 0 0 0-1.5 0v1.033a.75.75 0 1 0 1.5 0zM16.081 12a4.081 4.081 0 1 1-8.162 0 4.081 4.081 0 0 1 8.162 0m1.5 0A5.581 5.581 0 1 1 6.42 12a5.581 5.581 0 0 1 11.162 0"
      clip-rule="evenodd"
    />
  </svg>
`;
export default LightMode;
