import type { SVGProps } from 'react';
import * as React from 'react';
const SidebarIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.5 6.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2zm6.75-.5h8.25a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-.5.5h-8.25zm-1.5 0H5.5a.5.5 0 0 0-.5.5v11a.5.5 0 0 0 .5.5h3.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default SidebarIcon;
