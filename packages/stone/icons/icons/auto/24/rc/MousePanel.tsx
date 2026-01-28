import type { SVGProps } from 'react';
import * as React from 'react';
const MousePanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m3.785 4.37 5.68 13.995c.143.35.592.45.87.194l3.116-2.88 3.672 3.973a1.082 1.082 0 1 0 1.59-1.469L15.04 14.21l3.117-2.88a.54.54 0 0 0-.125-.882L4.528 3.682a.541.541 0 0 0-.743.687"
      clipRule="evenodd"
    />
  </svg>
);
export default MousePanelIcon;
