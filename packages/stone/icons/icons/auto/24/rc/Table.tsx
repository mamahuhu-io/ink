import type { SVGProps } from 'react';
import * as React from 'react';
const TableIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.25 6A2.75 2.75 0 0 1 5 3.25h14A2.75 2.75 0 0 1 21.75 6v12A2.75 2.75 0 0 1 19 20.75H5A2.75 2.75 0 0 1 2.25 18zM5 4.75c-.69 0-1.25.56-1.25 1.25v2.25h4.5v-3.5zm-1.25 5h4.5v3.5h-4.5zm6 0v3.5h4.5v-3.5zm6 0v3.5h4.5v-3.5zm-1.5 5h-4.5v4.5h4.5zm1.5 4.5v-4.5h4.5V18c0 .69-.56 1.25-1.25 1.25zm0-11v-3.5H19c.69 0 1.25.56 1.25 1.25v2.25zm-1.5-3.5v3.5h-4.5v-3.5zm-10.5 10h4.5v4.5H5c-.69 0-1.25-.56-1.25-1.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default TableIcon;
