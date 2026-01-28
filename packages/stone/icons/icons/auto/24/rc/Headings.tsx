import type { SVGProps } from 'react';
import * as React from 'react';
const HeadingsIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.416 4c.506 0 .916.4.916.894v6.212h7.336V4.894c0-.494.41-.894.916-.894s.916.4.916.894v14.212c0 .494-.41.894-.916.894a.905.905 0 0 1-.916-.894v-6.212H8.332v6.212c0 .494-.41.894-.916.894a.905.905 0 0 1-.916-.894V4.894C6.5 4.4 6.91 4 7.416 4"
      clipRule="evenodd"
    />
  </svg>
);
export default HeadingsIcon;
