import type { SVGProps } from 'react';
import * as React from 'react';
const WrapIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.046 5a.75.75 0 0 1 .75-.75h2.882a6.072 6.072 0 1 1 0 12.144h-8.89l3.027 3.08a.75.75 0 0 1-1.07 1.052l-4.28-4.356a.75.75 0 0 1 0-1.051l4.28-4.356a.75.75 0 1 1 1.07 1.052l-3.026 3.08h8.889a4.572 4.572 0 1 0 0-9.145h-2.882a.75.75 0 0 1-.75-.75"
      clipRule="evenodd"
    />
  </svg>
);
export default WrapIcon;
