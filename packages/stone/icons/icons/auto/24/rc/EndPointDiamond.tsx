import type { SVGProps } from 'react';
import * as React from 'react';
const EndPointDiamondIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.47 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 0 1-1.06 0l-2.78-2.78H3a.75.75 0 0 1 0-1.5h11.69z"
    />
  </svg>
);
export default EndPointDiamondIcon;
