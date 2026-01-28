import type { SVGProps } from 'react';
import * as React from 'react';
const WarningIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 4.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5M3.25 12a8.75 8.75 0 1 1 17.5 0 8.75 8.75 0 0 1-17.5 0M12 7.694a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-1.5 0V8.444a.75.75 0 0 1 .75-.75m-.75 7.862a.75.75 0 0 1 .75-.75h.009a.75.75 0 1 1 0 1.5H12a.75.75 0 0 1-.75-.75"
      clipRule="evenodd"
    />
  </svg>
);
export default WarningIcon;
