import type { SVGProps } from 'react';
import * as React from 'react';
const ZoomDownIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.115 4.885a6.23 6.23 0 1 0 0 12.461 6.23 6.23 0 0 0 0-12.461M3.5 11.115a7.615 7.615 0 1 1 13.468 4.874l4.33 4.33a.692.692 0 1 1-.98.978l-4.33-4.33A7.615 7.615 0 0 1 3.5 11.116m4.154 0c0-.382.31-.692.692-.692h5.539a.692.692 0 1 1 0 1.385H8.346a.69.69 0 0 1-.692-.693"
      clipRule="evenodd"
    />
  </svg>
);
export default ZoomDownIcon;
