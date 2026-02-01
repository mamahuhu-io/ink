import type { SVGProps } from 'react';
import * as React from 'react';
const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
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
      fill="#000"
      fillOpacity={0.1}
      d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10M4.95 12a7.05 7.05 0 1 0 14.1 0 7.05 7.05 0 0 0-14.1 0"
    />
    <path
      fill="#1E96EB"
      d="M20.525 12c.815 0 1.486-.664 1.366-1.47A10 10 0 0 0 13.47 2.11c-.806-.12-1.47.551-1.47 1.366s.667 1.46 1.464 1.629a7.05 7.05 0 0 1 5.432 5.432c.17.797.814 1.464 1.629 1.464"
    />
  </svg>
);
export default LoadingIcon;
