import type { SVGProps } from 'react';
import * as React from 'react';
const CollectPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v14.057a1 1 0 0 1-1.581.814L12 16l-5.419 3.87A1 1 0 0 1 5 19.058z"
    />
  </svg>
);
export default CollectPanelIcon;
