import { html } from 'lit';
const AddTag = ({
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
      d="M4.564 7.467a3.017 3.017 0 0 1 2.903-2.903l4.606-.17c.323-.013.636.11.864.338L14.5 6.296a.696.696 0 1 0 .984-.984l-1.564-1.564a2.55 2.55 0 0 0-1.9-.746l-4.606.17a4.41 4.41 0 0 0-4.243 4.243l-.17 4.607c-.027.71.244 1.397.746 1.9l6.647 6.647a2.553 2.553 0 0 0 3.61 0l.88-.88a.696.696 0 1 0-.984-.985l-.88.88a1.16 1.16 0 0 1-1.641 0l-6.648-6.647a1.16 1.16 0 0 1-.339-.864z"
    />
    <path
      fill="currentColor"
      d="M8.262 8.262A.928.928 0 1 0 6.95 6.95a.928.928 0 0 0 1.313 1.313M17.75 9a.75.75 0 0 1 .75.75V12h2.25a.75.75 0 0 1 0 1.5H18.5v2.25a.75.75 0 0 1-1.5 0V13.5h-2.25a.75.75 0 0 1 0-1.5H17V9.75a.75.75 0 0 1 .75-.75"
    />
  </svg>
`;
export default AddTag;
