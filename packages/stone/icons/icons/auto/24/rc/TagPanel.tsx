import type { SVGProps } from 'react';
import * as React from 'react';
const TagPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.09 6A1.09 1.09 0 0 0 3 7.09v9.82c0 .602.488 1.09 1.09 1.09h12.238c.336 0 .653-.155.86-.42l3.833-4.909a1.09 1.09 0 0 0 0-1.342l-3.833-4.91a1.09 1.09 0 0 0-.86-.419zm11.456 7.636a1.636 1.636 0 1 0 0-3.272 1.636 1.636 0 0 0 0 3.272"
      clipRule="evenodd"
    />
  </svg>
);
export default TagPanelIcon;
