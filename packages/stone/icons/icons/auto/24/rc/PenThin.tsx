import type { SVGProps } from 'react';
import * as React from 'react';
const PenThinIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path fill="currentColor" d="M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0" />
  </svg>
);
export default PenThinIcon;
