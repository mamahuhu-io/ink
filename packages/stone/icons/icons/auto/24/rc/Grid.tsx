import type { SVGProps } from 'react';
import * as React from 'react';
const GridIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.5 5.5a1 1 0 0 1 1-1H7a1 1 0 0 1 1 1V7a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1zm0 12a1 1 0 0 1 1-1H7a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1zm6 0a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1zm7-1a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1zm-6-12a1 1 0 0 0-1 1V7a1 1 0 0 0 1 1H13a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1zm5 1a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1V7a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1zm-11 5a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1H7a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1zm5 1a1 1 0 0 1 1-1H13a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1zm7-1a1 1 0 0 0-1 1V13a1 1 0 0 0 1 1H19a1 1 0 0 0 1-1v-1.5a1 1 0 0 0-1-1z"
      clipRule="evenodd"
    />
  </svg>
);
export default GridIcon;
