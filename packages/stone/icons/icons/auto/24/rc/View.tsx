import type { SVGProps } from 'react';
import * as React from 'react';
const ViewIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 5.75a9.25 9.25 0 0 0-8.635 5.926.9.9 0 0 0 0 .648 9.254 9.254 0 0 0 17.27 0 .9.9 0 0 0 0-.648A9.25 9.25 0 0 0 12 5.75M1.966 11.137C3.516 7.11 7.424 4.25 12 4.25s8.484 2.86 10.035 6.887c.214.555.214 1.17 0 1.726-1.55 4.027-5.458 6.887-10.034 6.887s-8.484-2.86-10.035-6.887a2.4 2.4 0 0 1 0-1.726M12 9.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5M8.25 12a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0"
      clipRule="evenodd"
    />
  </svg>
);
export default ViewIcon;
