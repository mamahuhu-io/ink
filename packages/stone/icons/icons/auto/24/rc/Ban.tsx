import type { SVGProps } from 'react';
import * as React from 'react';
const BanIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12M12 3.75a8.25 8.25 0 0 0-6.336 13.533L17.28 5.662A8.22 8.22 0 0 0 12 3.75m6.342 2.973L6.724 18.343a8.25 8.25 0 0 0 11.617-11.62"
      clipRule="evenodd"
    />
  </svg>
);
export default BanIcon;
