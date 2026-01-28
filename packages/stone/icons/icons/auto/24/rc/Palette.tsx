import type { SVGProps } from 'react';
import * as React from 'react';
const PaletteIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75a3.9 3.9 0 0 0 3.9-3.9v-.585c0-.4.003-.486.012-.543a.975.975 0 0 1 .81-.81c.057-.009.143-.012.543-.012h.585a3.9 3.9 0 0 0 3.9-3.9c0-5.385-4.365-9.75-9.75-9.75M9.075 7.613a1.462 1.462 0 1 1 2.925 0 1.462 1.462 0 0 1-2.925 0m4.875.974a1.463 1.463 0 1 1 2.925 0 1.463 1.463 0 0 1-2.925 0M7.613 10.05a1.463 1.463 0 1 0 0 2.925 1.463 1.463 0 0 0 0-2.925"
      clipRule="evenodd"
    />
  </svg>
);
export default PaletteIcon;
