import type { SVGProps } from 'react';
import * as React from 'react';
const RightLayoutIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.25 8.5a4.25 4.25 0 0 1 4.25-4.25H21a.75.75 0 0 1 0 1.5h-5.5a2.75 2.75 0 0 0-2.75 2.75c0 1.049-.38 2.009-1.01 2.75H21a.75.75 0 0 1 0 1.5h-9.26a4.23 4.23 0 0 1 1.01 2.75 2.75 2.75 0 0 0 2.75 2.75H21a.75.75 0 0 1 0 1.5h-5.5a4.25 4.25 0 0 1-4.25-4.25 2.75 2.75 0 0 0-2.75-2.75H3a.75.75 0 0 1 0-1.5h5.5a2.75 2.75 0 0 0 2.75-2.75"
      clipRule="evenodd"
    />
  </svg>
);
export default RightLayoutIcon;
