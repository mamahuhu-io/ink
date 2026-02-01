import type { SVGProps } from 'react';
import * as React from 'react';
const InsertLeftIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14 3.75a1.75 1.75 0 0 0-1.75 1.75v13c0 .966.784 1.75 1.75 1.75h4a1.75 1.75 0 0 0 1.75-1.75v-13A1.75 1.75 0 0 0 18 3.75zm-.25 1.75a.25.25 0 0 1 .25-.25h4a.25.25 0 0 1 .25.25v13a.25.25 0 0 1-.25.25h-4a.25.25 0 0 1-.25-.25zm-5.5 4a.75.75 0 0 0-1.5 0v1.75H5a.75.75 0 0 0 0 1.5h1.75v1.75a.75.75 0 0 0 1.5 0v-1.75H10a.75.75 0 0 0 0-1.5H8.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default InsertLeftIcon;
