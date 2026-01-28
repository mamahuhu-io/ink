import { html } from 'lit';
const ReadwiseLogoDuotone = ({
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
      fill="#000"
      fill-rule="evenodd"
      d="M20.6 19.756c-1.074-.128-1.598-.482-2.242-1.553l-3.649-5.935c2.718-.457 4.067-1.782 4.067-4.557 0-3.668-2.59-4.711-7.55-4.711H3v1.07c1.574.129 1.885.307 1.885 1.783v12.121c0 1.45-.359 1.654-1.885 1.782v1.071h7.993v-1.07c-1.526-.129-1.885-.33-1.885-1.783V12.55h1.238l4.96 8.278H20.6zM14.642 9.33s-.65-3.647-.229-4.42l-5.372 5.934c1.314-1.093 5.289-1.11 5.289-1.11a.395.395 0 0 0 .312-.404"
      clip-rule="evenodd"
    />
  </svg>
`;
export default ReadwiseLogoDuotone;
