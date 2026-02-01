import type { SVGProps } from 'react';
import * as React from 'react';
const InsertAboveIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.5 6.75a.75.75 0 0 0 0 1.5h1.75V10a.75.75 0 0 0 1.5 0V8.25h1.75a.75.75 0 0 0 0-1.5h-1.75V5a.75.75 0 0 0-1.5 0v1.75zM3.75 18c0 .966.784 1.75 1.75 1.75h13A1.75 1.75 0 0 0 20.25 18v-4a1.75 1.75 0 0 0-1.75-1.75h-13A1.75 1.75 0 0 0 3.75 14zm1.75.25a.25.25 0 0 1-.25-.25v-4a.25.25 0 0 1 .25-.25h13a.25.25 0 0 1 .25.25v4a.25.25 0 0 1-.25.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default InsertAboveIcon;
