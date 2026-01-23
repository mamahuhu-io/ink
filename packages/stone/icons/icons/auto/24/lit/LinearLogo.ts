import { html } from 'lit';
const LinearLogo =
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
    <g clip-path="url(#a)"><path fill='currentColor' d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12"/><g fill='currentColor' filter="url(#b)"><path d="M5.171 13.613c-.03-.133.128-.216.224-.12l5.112 5.112c.096.096.013.255-.12.223a7.02 7.02 0 0 1-5.216-5.215M5 11.565a.14.14 0 0 0 .04.106l7.29 7.288a.14.14 0 0 0 .105.04 7 7 0 0 0 .975-.129.136.136 0 0 0 .067-.23l-8.116-8.117a.136.136 0 0 0-.231.067 7 7 0 0 0-.13.975M5.59 9.159a.14.14 0 0 0 .029.154l9.068 9.068c.04.04.102.053.154.03q.376-.168.726-.376a.137.137 0 0 0 .026-.216L6.18 8.407a.137.137 0 0 0-.216.026 7 7 0 0 0-.376.726M6.772 7.53a.14.14 0 0 1-.006-.19 7.007 7.007 0 1 1 9.893 9.893.14.14 0 0 1-.19-.005z"/></g></g><defs><filter id="b" width="180.337" height="180.337" x="-78.168" y="-65.173" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="12.995"/><feGaussianBlur stdDeviation="41.584"/><feColorMatrix values="0 0 0 0 0.118924 0 0 0 0 0.158031 0 0 0 0 0.570833 0 0 0 0.7 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow_858_5588"/><feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="4.548"/><feGaussianBlur stdDeviation="17.5"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0"/><feBlend in2="effect1_dropShadow_858_5588" result="effect2_dropShadow_858_5588"/><feBlend in="SourceGraphic" in2="effect2_dropShadow_858_5588" result="shape"/></filter><clipPath id="a"><path fill='currentColor' d="M0 0H24V24H0z"/></clipPath></defs>
  </svg>
`;
export default LinearLogo;
