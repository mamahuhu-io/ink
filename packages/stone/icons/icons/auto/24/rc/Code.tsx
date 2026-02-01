import type { SVGProps } from 'react';
import * as React from 'react';
const CodeIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.982 4.272a.75.75 0 0 1 .546.91l-3.6 14.4a.75.75 0 1 1-1.456-.364l3.6-14.4a.75.75 0 0 1 .91-.546M7.13 8.07a.75.75 0 0 1 0 1.06L4.06 12.2l3.07 3.07a.75.75 0 0 1-1.06 1.06l-3.6-3.6a.75.75 0 0 1 0-1.06l3.6-3.6a.75.75 0 0 1 1.06 0m9.74 0a.75.75 0 0 1 1.06 0l3.6 3.6a.75.75 0 0 1 0 1.06l-3.6 3.6a.75.75 0 1 1-1.06-1.06l3.07-3.07-3.07-3.07a.75.75 0 0 1 0-1.06"
      clipRule="evenodd"
    />
  </svg>
);
export default CodeIcon;
