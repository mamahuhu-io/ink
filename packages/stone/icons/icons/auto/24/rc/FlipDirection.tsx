import type { SVGProps } from 'react';
import * as React from 'react';
const FlipDirectionIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m5.208 11.106.694-.617a.75.75 0 0 1 .996 1.122l-1.96 1.74a.75.75 0 0 1-1.012-.014L2.08 11.596a.75.75 0 1 1 1.03-1.091l.592.558a8.351 8.351 0 0 1 14.203-4.967.75.75 0 1 1-1.06 1.06 6.851 6.851 0 0 0-11.636 3.95m14.397-.525a.75.75 0 0 1 .531.257l1.826 2.094a.75.75 0 0 1-1.13.986l-.576-.66A8.352 8.352 0 0 1 5.97 17.776a.75.75 0 0 1 1.083-1.038 6.852 6.852 0 0 0 11.702-3.593l-.863.823a.75.75 0 0 1-1.035-1.086l2.196-2.094a.75.75 0 0 1 .552-.207"
      clipRule="evenodd"
    />
  </svg>
);
export default FlipDirectionIcon;
