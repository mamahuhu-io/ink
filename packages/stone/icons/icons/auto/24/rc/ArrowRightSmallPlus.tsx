import type { SVGProps } from 'react';
import * as React from 'react';
const ArrowRightSmallPlusIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.293 6.293a1 1 0 0 0 0 1.414L12.586 12l-4.293 4.293a1 1 0 1 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 0 0-1.414 0"
      clipRule="evenodd"
    />
  </svg>
);
export default ArrowRightSmallPlusIcon;
