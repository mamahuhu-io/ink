import type { SVGProps } from 'react';
import * as React from 'react';
const MathPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.962 4a1 1 0 0 1 1 1v1.962h1.963a1 1 0 1 1 0 2H7.962v1.963a1 1 0 1 1-2 0V8.962H4a1 1 0 1 1 0-2h1.962V5a1 1 0 0 1 1-1m5.733 3.962a1 1 0 0 1 1-1h5.925a1 1 0 1 1 0 2h-5.925a1 1 0 0 1-1-1m0 10.234a1 1 0 0 1 1-1h5.925a1 1 0 1 1 0 2h-5.925a1 1 0 0 1-1-1m1-4.231a1 1 0 1 0 0 2h5.925a1 1 0 1 0 0-2zm-8.12.083a1 1 0 1 0-1.414 1.414l1.387 1.388-1.387 1.387a1 1 0 1 0 1.414 1.415l1.387-1.388 1.388 1.388a1 1 0 0 0 1.414-1.415L8.377 16.85l1.387-1.388a1 1 0 0 0-1.414-1.414l-1.388 1.387z"
      clipRule="evenodd"
    />
  </svg>
);
export default MathPanelIcon;
