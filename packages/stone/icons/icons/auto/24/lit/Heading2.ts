import { html } from 'lit';
const Heading2 = ({
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
      d="M14.159 16c-.562.638-.725.905-.725 1.248 0 .553.439.886 1.135.886h6.289c.524 0 .829-.276.829-.724 0-.457-.324-.734-.83-.734H15.57v-.114l3.526-4.031c1.715-1.953 2.201-2.859 2.201-4.098 0-2.096-1.648-3.583-3.993-3.583-2.515 0-4.088 1.697-4.088 3.317 0 .514.305.867.772.867.39 0 .658-.258.791-.763.286-1.238 1.191-1.972 2.42-1.972 1.449 0 2.411.896 2.411 2.24 0 .895-.41 1.695-1.486 2.925zM3.419 5.364c.404 0 .731.327.731.731v5.087h5.863V6.095a.732.732 0 1 1 1.464 0v11.637a.732.732 0 0 1-1.464 0v-5.087H4.15v5.087a.732.732 0 1 1-1.463 0V6.095c0-.404.327-.731.732-.731"
      clip-rule="evenodd"
    />
  </svg>
`;
export default Heading2;
