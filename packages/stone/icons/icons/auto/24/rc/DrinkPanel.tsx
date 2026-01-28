import type { SVGProps } from 'react';
import * as React from 'react';
const DrinkPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.515 4H5l.214 1.5L7 18h9l1.786-12.5L18 4H6.515m.715 5h8.54l.5-3.5H6.73zM6 20.75h11v-1.5H6z"
      clipRule="evenodd"
    />
  </svg>
);
export default DrinkPanelIcon;
