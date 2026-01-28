import type { SVGProps } from 'react';
import * as React from 'react';
const ComputerPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.5 6h-11v8h11zm-11-2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm4.42 12.902a.5.5 0 0 1 .49-.402h1.18a.5.5 0 0 1 .49.402l.285 1.422c.618.323 1.046.858 1.123 1.476.013.11-.077.2-.188.2H9.7c-.11 0-.201-.09-.188-.2.077-.618.505-1.153 1.123-1.476z"
      clipRule="evenodd"
    />
  </svg>
);
export default ComputerPanelIcon;
