import type { SVGProps } from 'react';
import * as React from 'react';
const SignOutIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 2.25A2.75 2.75 0 0 0 5.25 5v14A2.75 2.75 0 0 0 8 21.75h5A2.75 2.75 0 0 0 15.75 19v-1.5a.75.75 0 0 0-1.5 0V19c0 .69-.56 1.25-1.25 1.25H8c-.69 0-1.25-.56-1.25-1.25V5c0-.69.56-1.25 1.25-1.25h5c.69 0 1.25.56 1.25 1.25v1.5a.75.75 0 0 0 1.5 0V5A2.75 2.75 0 0 0 13 2.25zm10.03 6.22a.75.75 0 1 0-1.06 1.06l1 1 .72.72H11a.75.75 0 0 0 0 1.5h7.69l-.72.72-1 1a.75.75 0 1 0 1.06 1.06l1-1 2-2a.75.75 0 0 0 0-1.06l-2-2z"
      clipRule="evenodd"
    />
  </svg>
);
export default SignOutIcon;
