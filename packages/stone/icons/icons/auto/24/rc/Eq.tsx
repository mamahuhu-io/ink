import type { SVGProps } from 'react';
import * as React from 'react';
const EqIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.5 10.25h11v-1.5h-11zm0 5.5h11v-1.5h-11z"
      clipRule="evenodd"
    />
  </svg>
);
export default EqIcon;
