import type { SVGProps } from 'react';
import * as React from 'react';
const MoveLeftIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.75 4a.75.75 0 0 0-1.5 0v16a.75.75 0 0 0 1.5 0zm8.405 4.57a.75.75 0 1 0-.976-1.14l-4.667 4a.75.75 0 0 0 0 1.14l4.667 4a.75.75 0 1 0 .976-1.14l-3.128-2.68H20a.75.75 0 0 0 0-1.5h-9.973z"
      clipRule="evenodd"
    />
  </svg>
);
export default MoveLeftIcon;
