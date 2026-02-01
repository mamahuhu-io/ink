import type { SVGProps } from 'react';
import * as React from 'react';
const EyePanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.5 18c6.276 0 8.807-4.875 9.372-6.181a.8.8 0 0 0 0-.638C21.307 9.875 18.776 5 12.5 5s-8.807 4.875-9.372 6.181a.8.8 0 0 0 0 .638C3.693 13.125 6.224 18 12.5 18m-1.885-6.5a1.885 1.885 0 1 1 3.77 0 1.885 1.885 0 0 1-3.77 0M12.5 8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7"
      clipRule="evenodd"
    />
  </svg>
);
export default EyePanelIcon;
