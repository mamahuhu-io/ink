import type { SVGProps } from 'react';
import * as React from 'react';
const ShorterIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 5.75a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 0-1.5zm0 3.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5z"
      clipRule="evenodd"
    />
  </svg>
);
export default ShorterIcon;
