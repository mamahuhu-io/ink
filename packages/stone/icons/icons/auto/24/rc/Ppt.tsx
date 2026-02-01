import type { SVGProps } from 'react';
import * as React from 'react';
const PptIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.25 6.5A2.25 2.25 0 0 1 4.5 4.25h15a2.25 2.25 0 0 1 2.25 2.25v11a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25zm2.25-.75a.75.75 0 0 0-.75.75v11c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75v-11a.75.75 0 0 0-.75-.75zM5.75 8.5a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m.75 2.75a.75.75 0 0 0 0 1.5H13a.75.75 0 0 0 0-1.5zm8.25.75a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75M6.5 14.75a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5z"
      clipRule="evenodd"
    />
  </svg>
);
export default PptIcon;
