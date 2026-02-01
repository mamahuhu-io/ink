import type { SVGProps } from 'react';
import * as React from 'react';
const EndPointTriangleIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.53 7.47a.75.75 0 0 0-1.28.53v3.25H3a.75.75 0 0 0 0 1.5h13.25V16a.75.75 0 0 0 1.28.53l4-4a.75.75 0 0 0 0-1.06z"
    />
  </svg>
);
export default EndPointTriangleIcon;
