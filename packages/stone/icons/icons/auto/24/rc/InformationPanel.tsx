import type { SVGProps } from 'react';
import * as React from 'react';
const InformationPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20.5 11.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0m-9.611-4.253a1.164 1.164 0 1 1 2.322 0l-.358 5.005a.805.805 0 0 1-1.606 0zM12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      clipRule="evenodd"
    />
  </svg>
);
export default InformationPanelIcon;
