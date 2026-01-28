import type { SVGProps } from 'react';
import * as React from 'react';
const UserIcon = (props: SVGProps<SVGSVGElement>) => (
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
      fill="#B3B3B3"
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12a9.97 9.97 0 0 0 3.2 7.333A9.97 9.97 0 0 0 12 22a9.97 9.97 0 0 0 6.8-2.667A9.97 9.97 0 0 0 22 12c0-5.523-4.477-10-10-10M6.284 18.291a.46.46 0 0 1-.048-.631C7.568 16.03 9.575 15 12 15s4.432 1.03 5.764 2.66a.46.46 0 0 1-.048.631A8.47 8.47 0 0 1 12 20.5c-2.2 0-4.206-.837-5.716-2.209M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
      clipRule="evenodd"
    />
  </svg>
);
export default UserIcon;
