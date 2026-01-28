import type { SVGProps } from 'react';
import * as React from 'react';
const CaptionIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.25 7A2.75 2.75 0 0 1 7 4.25h5A2.75 2.75 0 0 1 14.75 7v3A2.75 2.75 0 0 1 12 12.75H7A2.75 2.75 0 0 1 4.25 10zM7 5.75c-.69 0-1.25.56-1.25 1.25v3c0 .69.56 1.25 1.25 1.25h5c.69 0 1.25-.56 1.25-1.25V7c0-.69-.56-1.25-1.25-1.25zM4.25 15.5a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75M5 18.25a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5z"
      clipRule="evenodd"
    />
  </svg>
);
export default CaptionIcon;
