import type { SVGProps } from 'react';
import * as React from 'react';
const FolderPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4 8V4a1 1 0 0 1 1-1h4.15a1 1 0 0 1 .624.22L12 5h8a1 1 0 0 1 1 1v2zm17 1.5H4V18a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2z"
      clipRule="evenodd"
    />
  </svg>
);
export default FolderPanelIcon;
