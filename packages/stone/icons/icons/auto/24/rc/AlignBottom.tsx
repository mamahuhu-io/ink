import type { SVGProps } from 'react';
import * as React from 'react';
const AlignBottomIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15 4a1 1 0 0 1 1 1v12a1 1 0 0 1-.031.25H20a.75.75 0 0 1 0 1.5H4a.75.75 0 0 1 0-1.5h4.031A1 1 0 0 1 8 17v-6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v6a1 1 0 0 1-.031.25h2.063A1 1 0 0 1 13 17V5a1 1 0 0 1 1-1z"
      clipRule="evenodd"
    />
  </svg>
);
export default AlignBottomIcon;
