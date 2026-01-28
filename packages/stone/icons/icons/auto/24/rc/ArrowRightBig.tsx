import type { SVGProps } from 'react';
import * as React from 'react';
const ArrowRightBigIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.003 6.493a.75.75 0 0 0 .045 1.06l4.027 3.697H5a.75.75 0 0 0 0 1.5h12.075l-4.027 3.698a.75.75 0 1 0 1.015 1.104l5.444-5a.75.75 0 0 0 0-1.104l-5.444-5a.75.75 0 0 0-1.06.045"
      clipRule="evenodd"
    />
  </svg>
);
export default ArrowRightBigIcon;
