import type { SVGProps } from 'react';
import * as React from 'react';
const HexagonIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="m21.86 12-4.921 8.75H7.06L2.14 12l4.922-8.75h9.878zm-5.799-7.25H7.94L3.86 12l4.079 7.25h8.122L20.14 12z"
      clipRule="evenodd"
    />
  </svg>
);
export default HexagonIcon;
