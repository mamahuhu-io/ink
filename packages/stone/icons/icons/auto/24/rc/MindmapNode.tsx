import type { SVGProps } from 'react';
import * as React from 'react';
const MindmapNodeIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.75 4.5c-1.138 0-2.098.76-2.4 1.8H8.764a2.75 2.75 0 0 0-2.75 2.75v1c0 .69-.56 1.25-1.25 1.25H2v1.5h2.765c.69 0 1.25.56 1.25 1.25v1a2.75 2.75 0 0 0 2.75 2.75h1.616a2.5 2.5 0 0 0 2.369 1.7h5.5a2.5 2.5 0 0 0 0-5h-5.5c-1.138 0-2.098.76-2.4 1.8H8.764c-.69 0-1.25-.56-1.25-1.25v-1c0-.788-.332-1.499-.863-2a2.74 2.74 0 0 0 .863-2v-1c0-.69.56-1.25 1.25-1.25h1.616a2.5 2.5 0 0 0 2.369 1.7h5.5a2.5 2.5 0 0 0 0-5zm-1 2.5a1 1 0 0 1 1-1h5.5a1 1 0 1 1 0 2h-5.5a1 1 0 0 1-1-1m0 10a1 1 0 0 1 1-1h5.5a1 1 0 1 1 0 2h-5.5a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default MindmapNodeIcon;
