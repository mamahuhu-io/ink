import type { SVGProps } from 'react';
import * as React from 'react';
const PasteIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.8 2.489a.75.75 0 0 0-.75.75V4.25H7A2.75 2.75 0 0 0 4.25 7v12A2.75 2.75 0 0 0 7 21.75h10A2.75 2.75 0 0 0 19.75 19V7A2.75 2.75 0 0 0 17 4.25h-.95V3.239a.75.75 0 0 0-.75-.75zm7.25 3.261v.928a.75.75 0 0 1-.75.75H8.8a.75.75 0 0 1-.75-.75V5.75H7c-.69 0-1.25.56-1.25 1.25v12c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V7c0-.69-.56-1.25-1.25-1.25zm-6.5.178v-1.94h5v1.94z"
      clipRule="evenodd"
    />
  </svg>
);
export default PasteIcon;
