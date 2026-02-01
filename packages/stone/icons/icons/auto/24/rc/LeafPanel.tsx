import type { SVGProps } from 'react';
import * as React from 'react';
const LeafPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20 3.556c-1.482 1.44-5.607 4.39-9.333 5.333-2.549.645-5.511 2.629-3.753 6.688a1 1 0 0 0-.213.079c-2.356 1.226-3.353 3.545-3.572 4.61a.889.889 0 1 0 1.742.358c.147-.714.907-2.484 2.65-3.391a.9.9 0 0 0 .342-.315c1.752 1.509 5.756 2.465 9.47-1.807C18.311 13.987 20 10.222 20 3.556"
      clipRule="evenodd"
    />
  </svg>
);
export default LeafPanelIcon;
