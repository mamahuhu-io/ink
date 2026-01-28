import type { SVGProps } from 'react';
import * as React from 'react';
const TwitterIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.463 3.4h2.914l-6.365 7.275 7.488 9.899h-5.863l-4.592-6.004-5.255 6.004H2.875l6.809-7.782L2.5 3.4h6.012l4.15 5.488zm-1.022 15.43h1.614L7.635 5.052H5.903z"
    />
  </svg>
);
export default TwitterIcon;
