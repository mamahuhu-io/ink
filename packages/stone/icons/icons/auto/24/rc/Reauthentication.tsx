import type { SVGProps } from 'react';
import * as React from 'react';
const ReauthenticationIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4 9.75A.75.75 0 0 0 4.75 9V6c0-.69.56-1.25 1.25-1.25h3a.75.75 0 0 0 0-1.5H6A2.75 2.75 0 0 0 3.25 6v3c0 .414.336.75.75.75M4.75 15a.75.75 0 0 0-1.5 0v3A2.75 2.75 0 0 0 6 20.75h3a.75.75 0 0 0 0-1.5H6c-.69 0-1.25-.56-1.25-1.25zM19.25 15a.75.75 0 0 1 1.5 0v3A2.75 2.75 0 0 1 18 20.75h-3a.75.75 0 0 1 0-1.5h3c.69 0 1.25-.56 1.25-1.25zM19.25 9a.75.75 0 0 0 1.5 0V6A2.75 2.75 0 0 0 18 3.25h-3a.75.75 0 0 0 0 1.5h3c.69 0 1.25.56 1.25 1.25z"
    />
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M12.406 12.75A3.001 3.001 0 0 1 6.5 12a3 3 0 0 1 5.906-.75H16.5a.75.75 0 0 1 .67.415l.5 1a.75.75 0 1 1-1.34.67l-.293-.585zM9.5 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"
      clipRule="evenodd"
    />
  </svg>
);
export default ReauthenticationIcon;
