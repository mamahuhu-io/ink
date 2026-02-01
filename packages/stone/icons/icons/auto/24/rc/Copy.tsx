import type { SVGProps } from 'react';
import * as React from 'react';
const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.25 6A2.75 2.75 0 0 1 6 3.25h8A2.75 2.75 0 0 1 16.75 6v1.25H18A2.75 2.75 0 0 1 20.75 10v8A2.75 2.75 0 0 1 18 20.75h-8A2.75 2.75 0 0 1 7.25 18v-1.25H6A2.75 2.75 0 0 1 3.25 14zm5.5 12c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25v-8c0-.69-.56-1.25-1.25-1.25h-8c-.69 0-1.25.56-1.25 1.25zm6.5-10.75H10A2.75 2.75 0 0 0 7.25 10v5.25H6c-.69 0-1.25-.56-1.25-1.25V6c0-.69.56-1.25 1.25-1.25h8c.69 0 1.25.56 1.25 1.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default CopyIcon;
