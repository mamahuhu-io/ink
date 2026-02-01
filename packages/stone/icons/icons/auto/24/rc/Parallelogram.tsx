import type { SVGProps } from 'react';
import * as React from 'react';
const ParallelogramIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m8.276 5.5-4.213 13h11.661l4.213-13zM7.186 4 2 20h14.815L22 4z"
      clipRule="evenodd"
    />
  </svg>
);
export default ParallelogramIcon;
