import type { SVGProps } from 'react';
import * as React from 'react';
const GtIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.25 12a.75.75 0 0 1-.442.684l-10 4.5-.616-1.368L14.672 12l-8.48-3.816.616-1.368 10 4.5a.75.75 0 0 1 .442.684"
      clipRule="evenodd"
    />
  </svg>
);
export default GtIcon;
