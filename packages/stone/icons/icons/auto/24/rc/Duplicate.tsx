import type { SVGProps } from 'react';
import * as React from 'react';
const DuplicateIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 3.25A2.75 2.75 0 0 0 3.25 6v8A2.75 2.75 0 0 0 6 16.75h1.25V18A2.75 2.75 0 0 0 10 20.75h8A2.75 2.75 0 0 0 20.75 18v-8A2.75 2.75 0 0 0 18 7.25h-1.25V6A2.75 2.75 0 0 0 14 3.25zm4 4h5.25V6c0-.69-.56-1.25-1.25-1.25H6c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h2a.75.75 0 0 1 .75.75v2c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25v-8c0-.69-.56-1.25-1.25-1.25h-8a1.25 1.25 0 0 0-1.17.81.75.75 0 0 1-1.405-.528A2.75 2.75 0 0 1 10 7.25m2.887 3.239a.75.75 0 1 0-1.098 1.022l.688.739H7.8a.75.75 0 0 0 0 1.5h4.677l-.688.739a.75.75 0 0 0 1.098 1.022l1.862-2a.75.75 0 0 0 0-1.022z"
      clipRule="evenodd"
    />
  </svg>
);
export default DuplicateIcon;
