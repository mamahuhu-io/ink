import type { SVGProps } from 'react';
import * as React from 'react';
const RadiantIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.25 5A.75.75 0 0 1 3 4.25h1A4.25 4.25 0 0 1 8.25 8.5 2.75 2.75 0 0 0 11 11.25h2a2.75 2.75 0 0 0 2.75-2.75A4.25 4.25 0 0 1 20 4.25h1a.75.75 0 0 1 0 1.5h-1a2.75 2.75 0 0 0-2.75 2.75c0 1.049-.38 2.009-1.01 2.75H21a.75.75 0 0 1 0 1.5h-4.76a4.23 4.23 0 0 1 1.01 2.75A2.75 2.75 0 0 0 20 18.25h1a.75.75 0 0 1 0 1.5h-1a4.25 4.25 0 0 1-4.25-4.25A2.75 2.75 0 0 0 13 12.75h-2a2.75 2.75 0 0 0-2.75 2.75A4.25 4.25 0 0 1 4 19.75H3a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75c0-1.049.38-2.009 1.01-2.75H3a.75.75 0 0 1 0-1.5h4.76A4.23 4.23 0 0 1 6.75 8.5 2.75 2.75 0 0 0 4 5.75H3A.75.75 0 0 1 2.25 5"
      clipRule="evenodd"
    />
  </svg>
);
export default RadiantIcon;
