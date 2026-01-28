import type { SVGProps } from 'react';
import * as React from 'react';
const TextColorIcon = (props: SVGProps<SVGSVGElement>) => (
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
      fill="#7A7A7A"
      fillRule="evenodd"
      d="M10.453 4.622a1.652 1.652 0 0 1 3.094 0l4.155 11.081a.75.75 0 0 1-1.404.527l-1.22-3.253H8.922l-1.22 3.253a.75.75 0 0 1-1.404-.527zm-.969 6.855h5.031L12.142 5.15a.152.152 0 0 0-.284 0z"
      clipRule="evenodd"
    />
    <rect width={16} height={2.5} x={4} y={18} fill="#FB7081" rx={1} />
  </svg>
);
export default TextColorIcon;
