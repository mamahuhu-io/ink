import type { SVGProps } from 'react';
import * as React from 'react';
const DeletePermanentlyIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.25 5A2.75 2.75 0 0 1 11 2.25h2A2.75 2.75 0 0 1 15.75 5v1.25H20a.75.75 0 0 1 0 1.5h-.302l-.817 11.446a2.75 2.75 0 0 1-2.743 2.554H7.862a2.75 2.75 0 0 1-2.743-2.554L4.302 7.75H4a.75.75 0 0 1 0-1.5h4.25zm6 0v1.25h-4.5V5c0-.69.56-1.25 1.25-1.25h2c.69 0 1.25.56 1.25 1.25M5.805 7.75h12.39l-.81 11.34a1.25 1.25 0 0 1-1.247 1.16H7.862a1.25 1.25 0 0 1-1.247-1.16zm4.725 3.22a.75.75 0 1 0-1.06 1.06l1.47 1.47-1.47 1.47a.75.75 0 1 0 1.06 1.06L12 14.56l1.47 1.47a.75.75 0 1 0 1.06-1.06l-1.47-1.47 1.47-1.47a.75.75 0 1 0-1.06-1.06L12 12.44z"
      clipRule="evenodd"
    />
  </svg>
);
export default DeletePermanentlyIcon;
