import type { SVGProps } from 'react';
import * as React from 'react';
const PeriodIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path fill="currentColor" d="M10.5 6.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0z" />
  </svg>
);
export default PeriodIcon;
