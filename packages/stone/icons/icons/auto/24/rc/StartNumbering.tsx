import type { SVGProps } from 'react';
import * as React from 'react';
const StartNumberingIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M19.218 12.75a.75.75 0 0 0 .559-.245l2.277-2.5a.75.75 0 1 0-1.108-1.01l-.974 1.068V5a1.75 1.75 0 0 0-1.75-1.75H12a.75.75 0 0 0 0 1.5h6.222a.25.25 0 0 1 .25.25v5.027l-.911-1.025a.75.75 0 0 0-1.122.996l2.223 2.5a.75.75 0 0 0 .556.252m-14.936-1.5a.75.75 0 0 0-.559.245l-2.277 2.5a.75.75 0 1 0 1.108 1.01l.974-1.068V19c0 .966.783 1.75 1.75 1.75H11.5a.75.75 0 0 0 0-1.5H5.278a.25.25 0 0 1-.25-.25v-5.027l.911 1.025a.75.75 0 0 0 1.122-.996l-2.223-2.5a.75.75 0 0 0-.556-.252M13.25 9a.75.75 0 0 0-.987-.712l-1.5.5a.75.75 0 0 0 .474 1.423l.513-.17v4.209H10.5a.75.75 0 0 0 0 1.5h4a.75.75 0 0 0 0-1.5h-1.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default StartNumberingIcon;
