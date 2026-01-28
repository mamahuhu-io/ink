import type { SVGProps } from 'react';
import * as React from 'react';
const SignalIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.5 6.5h-13v6.119l6.5 4.55 6.5-4.55zm1.5 6.9L12 19l-8-5.6V5h16z"
      clipRule="evenodd"
    />
  </svg>
);
export default SignalIcon;
