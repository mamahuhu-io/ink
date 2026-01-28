import type { SVGProps } from 'react';
import * as React from 'react';
const WindowPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.5 10h-13v8a.5.5 0 0 0 .5.5h12a.5.5 0 0 0 .5-.5zM4 10V6q0-.207.04-.403A2 2 0 0 1 6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm3.5-3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5m2.75-.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0"
      clipRule="evenodd"
    />
  </svg>
);
export default WindowPanelIcon;
