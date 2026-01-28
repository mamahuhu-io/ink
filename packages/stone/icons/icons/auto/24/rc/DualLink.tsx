import type { SVGProps } from 'react';
import * as React from 'react';
const DualLinkIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10.667 6.2a.75.75 0 0 1 0-1.5H19a.75.75 0 0 1 .75.75v8.333a.75.75 0 0 1-1.5 0V7.261L6.53 18.98a.75.75 0 1 1-1.06-1.061L17.19 6.2z"
      clipRule="evenodd"
    />
  </svg>
);
export default DualLinkIcon;
