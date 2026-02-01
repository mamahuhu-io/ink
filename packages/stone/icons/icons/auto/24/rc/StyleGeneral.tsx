import type { SVGProps } from 'react';
import * as React from 'react';
const StyleGeneralIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.47 3.47a.75.75 0 0 0 0 1.06l16 16a.75.75 0 1 0 1.06-1.06l-16-16a.75.75 0 0 0-1.06 0"
      clipRule="evenodd"
    />
  </svg>
);
export default StyleGeneralIcon;
