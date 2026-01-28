import type { SVGProps } from 'react';
import * as React from 'react';
const DoneIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19.53 6.47a.75.75 0 0 1 0 1.06l-10 10a.75.75 0 0 1-1.06 0l-4-4a.75.75 0 1 1 1.06-1.06L9 15.94l9.47-9.47a.75.75 0 0 1 1.06 0"
      clipRule="evenodd"
    />
  </svg>
);
export default DoneIcon;
