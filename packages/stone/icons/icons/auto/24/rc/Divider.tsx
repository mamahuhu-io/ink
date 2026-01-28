import type { SVGProps } from 'react';
import * as React from 'react';
const DividerIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4 4.25a.75.75 0 0 1 .75.75v1c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25V5a.75.75 0 0 1 1.5 0v1A2.75 2.75 0 0 1 18 8.75H6A2.75 2.75 0 0 1 3.25 6V5A.75.75 0 0 1 4 4.25m0 15.5a.75.75 0 0 0 .75-.75v-1c0-.69.56-1.25 1.25-1.25h12c.69 0 1.25.56 1.25 1.25v1a.75.75 0 0 0 1.5 0v-1A2.75 2.75 0 0 0 18 15.25H6A2.75 2.75 0 0 0 3.25 18v1c0 .414.336.75.75.75m-1-8.5a.75.75 0 0 0 0 1.5h1.2a.75.75 0 0 0 0-1.5H3m3.45.75a.75.75 0 0 1 .75-.75h1.2a.75.75 0 0 1 0 1.5H7.2a.75.75 0 0 1-.75-.75m4.95-.75a.75.75 0 0 0 0 1.5h1.2a.75.75 0 0 0 0-1.5h-1.2m3.45.75a.75.75 0 0 1 .75-.75h1.2a.75.75 0 0 1 0 1.5h-1.2a.75.75 0 0 1-.75-.75m4.95-.75a.75.75 0 0 0 0 1.5H21a.75.75 0 0 0 0-1.5h-1.2"
      clipRule="evenodd"
    />
  </svg>
);
export default DividerIcon;
