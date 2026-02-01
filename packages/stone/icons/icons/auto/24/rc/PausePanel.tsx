import type { SVGProps } from 'react';
import * as React from 'react';
const PausePanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20.5 11.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0M10 8a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1m5 1a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0z"
      clipRule="evenodd"
    />
  </svg>
);
export default PausePanelIcon;
