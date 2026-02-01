import type { SVGProps } from 'react';
import * as React from 'react';
const LineStyleIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.65 5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 3.65 5m6.1 0a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 9.75 5m7.05-.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5zM3.245 12c0-.47.38-.85.85-.85h15.79a.85.85 0 1 1 0 1.7H4.094a.85.85 0 0 1-.85-.85M4.5 17.75a1.25 1.25 0 1 0 0 2.5h15a1.25 1.25 0 1 0 0-2.5z"
      clipRule="evenodd"
    />
  </svg>
);
export default LineStyleIcon;
