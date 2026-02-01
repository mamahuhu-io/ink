import type { SVGProps } from 'react';
import * as React from 'react';
const UnpinIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.591 3.692a2.75 2.75 0 0 1 3.89 0l2.827 2.828a2.75 2.75 0 0 1 0 3.889l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a1.25 1.25 0 0 0 0-1.768l-2.829-2.829a1.25 1.25 0 0 0-1.767 0l-1.061 1.06a.75.75 0 0 1-1.06-1.06zm-6.364-.708a.75.75 0 0 1 1.06 0l12.729 12.728a.75.75 0 0 1-1.061 1.061l-3.005-3.005-1.97 1.97.884.884a.75.75 0 1 1-1.06 1.06L11.09 13.97l-4.925 4.924a.75.75 0 1 1-1.06-1.06l4.924-4.925-3.712-3.712a.75.75 0 0 1 1.06-1.06l.884.883 1.97-1.97-3.005-3.005a.75.75 0 0 1 0-1.06m4.066 5.127-1.97 1.97 4.596 4.596 1.97-1.97z"
        clipRule="evenodd"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0H24V24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default UnpinIcon;
