import { html } from 'lit';
const HighLightLinear = ({
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
      d="M18.336 5.522a.917.917 0 0 0-1.297 0l-1.062 1.062 1.296 1.296 1.063-1.062a.917.917 0 0 0 0-1.296m1.06 2.357A2.417 2.417 0 1 0 15.98 4.46l-1.592 1.592-8.115 8.115-.056.056c-.646.646-1.044 1.044-1.356 1.506a5.8 5.8 0 0 0-.66 1.32c-.183.527-.263 1.084-.392 1.989l-.05.355a.75.75 0 0 0 .89.841l.477-.096c.813-.164 1.314-.265 1.786-.45a5.8 5.8 0 0 0 1.186-.636c.416-.291.777-.652 1.364-1.239zM16.213 8.94l-1.297-1.296-7.583 7.583c-.72.72-1.008 1.012-1.228 1.34q-.307.456-.488.976c-.09.258-.147.531-.221 1.009.467-.099.724-.165.966-.26q.466-.184.876-.47c.295-.206.56-.467 1.213-1.12zM12.083 19.5a.75.75 0 0 1 .75-.75H19.5a.75.75 0 0 1 0 1.5h-6.667a.75.75 0 0 1-.75-.75"
      clip-rule="evenodd"
    />
  </svg>
`;
export default HighLightLinear;
