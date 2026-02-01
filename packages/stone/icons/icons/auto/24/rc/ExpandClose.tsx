import type { SVGProps } from 'react';
import * as React from 'react';
const ExpandCloseIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20.53 3.47a.75.75 0 0 1 0 1.06l-4.22 4.22h2.19a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75v-4a.75.75 0 0 1 1.5 0v2.19l4.22-4.22a.75.75 0 0 1 1.06 0M5.5 15.25a.75.75 0 0 1 0-1.5h4a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-2.19l-4.22 4.22a.75.75 0 0 1-1.06-1.06l4.22-4.22z"
      clipRule="evenodd"
    />
  </svg>
);
export default ExpandCloseIcon;
