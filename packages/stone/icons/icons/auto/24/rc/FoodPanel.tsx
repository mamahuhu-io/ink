import type { SVGProps } from 'react';
import * as React from 'react';
const FoodPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.5 8h2L5.247 4.62a.832.832 0 0 0-1.385.924zM11 8H9L7.362 5.544a.832.832 0 0 1 1.385-.923zM5 9a1 1 0 0 0-1 1v1h16v-1a1 1 0 0 0-1-1zm15 3a8 8 0 1 1-16 0z"
      clipRule="evenodd"
    />
  </svg>
);
export default FoodPanelIcon;
