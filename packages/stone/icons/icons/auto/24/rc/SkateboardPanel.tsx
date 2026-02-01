import type { SVGProps } from 'react';
import * as React from 'react';
const SkateboardPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.116 8.616a1.25 1.25 0 0 1 1.768 0l.828.829a2.75 2.75 0 0 0 1.945.805h12.686c.73 0 1.429-.29 1.945-.805l.828-.829a1.25 1.25 0 0 1 1.768 1.768l-.829.828a5.25 5.25 0 0 1-3.712 1.538h-.374a2 2 0 1 1-1.938 0H7.969a2 2 0 1 1-1.938 0h-.374a5.25 5.25 0 0 1-3.712-1.538l-.829-.828a1.25 1.25 0 0 1 0-1.768"
      clipRule="evenodd"
    />
  </svg>
);
export default SkateboardPanelIcon;
