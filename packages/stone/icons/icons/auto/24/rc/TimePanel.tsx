import type { SVGProps } from 'react';
import * as React from 'react';
const TimePanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16m.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default TimePanelIcon;
