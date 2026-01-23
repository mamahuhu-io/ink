import { html } from 'lit';
const DocsDuotone =
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
    <path fill="#6880FF" fill-rule="evenodd" d="M4 17.593V6.407c0-.903.353-1.77.98-2.409A3.32 3.32 0 0 1 7.35 3h9.302c.448 0 .812.37.812.826v11.186l-.003.075a.83.83 0 0 1-.253.527.8.8 0 0 1-.556.223H7.35q-.241 0-.469.066a1.75 1.75 0 0 0-1.256 1.69c0 .465.181.912.505 1.24.324.33.762.515 1.22.515h11.027V4.686c0-.456.364-.826.812-.826s.812.37.812.826v15.488a.82.82 0 0 1-.812.826H7.348a3.32 3.32 0 0 1-2.367-.998A3.44 3.44 0 0 1 4 17.592m3.772-.826a.82.82 0 0 0-.812.826c0 .456.363.826.812.826h8.456c.449 0 .812-.37.812-.826a.82.82 0 0 0-.812-.826z" clip-rule="evenodd"/>
  </svg>
`;
export default DocsDuotone;
