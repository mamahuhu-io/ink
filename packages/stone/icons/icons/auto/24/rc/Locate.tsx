import type { SVGProps } from 'react';
import * as React from 'react';
const LocateIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 2.25a.75.75 0 0 1 .75.75v1.286a7.75 7.75 0 0 1 6.964 6.964H21a.75.75 0 0 1 0 1.5h-1.286a7.75 7.75 0 0 1-6.964 6.964V21a.75.75 0 0 1-1.5 0v-1.286a7.75 7.75 0 0 1-6.964-6.964H3a.75.75 0 0 1 0-1.5h1.286a7.75 7.75 0 0 1 6.964-6.964V3a.75.75 0 0 1 .75-.75m-.75 3.545a6.25 6.25 0 0 0-5.455 5.455H7a.75.75 0 0 1 0 1.5H5.795a6.25 6.25 0 0 0 5.455 5.456V17a.75.75 0 0 1 1.5 0v1.206a6.25 6.25 0 0 0 5.456-5.456H17a.75.75 0 0 1 0-1.5h1.206a6.25 6.25 0 0 0-5.456-5.455V7a.75.75 0 0 1-1.5 0z"
      clipRule="evenodd"
    />
    <path fill="currentColor" d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
  </svg>
);
export default LocateIcon;
