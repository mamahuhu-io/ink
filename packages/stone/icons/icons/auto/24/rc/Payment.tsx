import type { SVGProps } from 'react';
import * as React from 'react';
const PaymentIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.25 7A2.75 2.75 0 0 1 5 4.25h14A2.75 2.75 0 0 1 21.75 7v10A2.75 2.75 0 0 1 19 19.75H5A2.75 2.75 0 0 1 2.25 17zM5 5.75c-.69 0-1.25.56-1.25 1.25v1.25h16.5V7c0-.69-.56-1.25-1.25-1.25zm15.25 4H3.75V17c0 .69.56 1.25 1.25 1.25h14c.69 0 1.25-.56 1.25-1.25zm-6 5.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75"
      clipRule="evenodd"
    />
  </svg>
);
export default PaymentIcon;
