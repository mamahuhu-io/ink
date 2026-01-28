import type { SVGProps } from 'react';
import * as React from 'react';
const CancelWrapIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M16.53 2.47a.75.75 0 1 0-1.06 1.06l2.72 2.72H8a.75.75 0 0 0 0 1.5h10.19l-2.72 2.72a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06zm-5 9a.75.75 0 1 0-1.06 1.06l2.72 2.72H4.5a.75.75 0 0 0 0 1.5h8.69l-2.72 2.72a.75.75 0 1 0 1.06 1.06l4-4a.75.75 0 0 0 0-1.06z"
      clipRule="evenodd"
    />
  </svg>
);
export default CancelWrapIcon;
