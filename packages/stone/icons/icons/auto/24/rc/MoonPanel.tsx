import type { SVGProps } from 'react';
import * as React from 'react';
const MoonPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 20a8 8 0 0 0 7.954-8.867c-.023-.208-.324-.23-.412-.04a5 5 0 1 1-6.635-6.635c.19-.088.168-.39-.04-.412A8 8 0 1 0 12 20"
      clipRule="evenodd"
    />
  </svg>
);
export default MoonPanelIcon;
