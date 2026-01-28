import type { SVGProps } from 'react';
import * as React from 'react';
const AutoSizeIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.25 6A2.75 2.75 0 0 1 6 3.25h2.5a.75.75 0 0 1 0 1.5H6c-.69 0-1.25.56-1.25 1.25v2.5a.75.75 0 0 1-1.5 0zm11.5-2a.75.75 0 0 1 .75-.75H18A2.75 2.75 0 0 1 20.75 6v2.5a.75.75 0 0 1-1.5 0V6c0-.69-.56-1.25-1.25-1.25h-2.5a.75.75 0 0 1-.75-.75M4 14.75a.75.75 0 0 1 .75.75V18c0 .69.56 1.25 1.25 1.25h3a.75.75 0 0 1 0 1.5H6A2.75 2.75 0 0 1 3.25 18v-2.5a.75.75 0 0 1 .75-.75m16 0a.75.75 0 0 1 .75.75V18A2.75 2.75 0 0 1 18 20.75h-3a.75.75 0 0 1 0-1.5h3c.69 0 1.25-.56 1.25-1.25v-2.5a.75.75 0 0 1 .75-.75"
      clipRule="evenodd"
    />
  </svg>
);
export default AutoSizeIcon;
