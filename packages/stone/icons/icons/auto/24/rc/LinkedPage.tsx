import type { SVGProps } from 'react';
import * as React from 'react';
const LinkedPageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    style={{
      userSelect: 'none',
      flexShrink: 0,
    }}
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M4.25 6A2.75 2.75 0 0 1 7 3.25h10A2.75 2.75 0 0 1 19.75 6v6a.75.75 0 0 1-1.5 0V6c0-.69-.56-1.25-1.25-1.25H7c-.69 0-1.25.56-1.25 1.25v12c0 .69.56 1.25 1.25 1.25h5a.75.75 0 0 1 0 1.5H7A2.75 2.75 0 0 1 4.25 18zm4 2A.75.75 0 0 1 9 7.25h3a.75.75 0 0 1 0 1.5H9A.75.75 0 0 1 8.25 8M9 10.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5zM8.25 15a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75m7.25-.75a.75.75 0 0 0 0 1.5h2.69l-3.72 3.72a.75.75 0 1 0 1.06 1.06l3.72-3.72v2.69a.75.75 0 0 0 1.5 0V15a.75.75 0 0 0-.75-.75z"
      clipRule="evenodd"
    />
  </svg>
);
export default LinkedPageIcon;
