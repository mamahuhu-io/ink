import type { SVGProps } from 'react';
import * as React from 'react';
const CustomizedHeightIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.25 12a.75.75 0 0 1 .75-.75h16a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1-.75-.75M12.53 10.53a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06L12 8.94l2.47-2.47a.75.75 0 1 1 1.06 1.06zM15.53 17.53a.75.75 0 0 1-1.06 0L12 15.06l-2.47 2.47a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06"
      clipRule="evenodd"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12 2.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75M11.25 21v-7h1.5v7a.75.75 0 0 1-1.5 0"
      clipRule="evenodd"
    />
  </svg>
);
export default CustomizedHeightIcon;
