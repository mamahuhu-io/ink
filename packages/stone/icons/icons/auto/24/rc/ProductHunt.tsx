import type { SVGProps } from 'react';
import * as React from 'react';
const ProductHuntIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M24.003 12c0 6.63-5.37 12-12 12s-12-5.37-12-12 5.37-12 12-12c6.629 0 12 5.37 12 12"
      />
      <path
        fill="currentColor"
        d="M13.603 12h-3.4V8.41h3.4c.99 0 1.8.81 1.8 1.8 0 .991-.81 1.801-1.8 1.801m0-6H7.802v12h2.4v-3.6h3.4a4.2 4.2 0 1 0 0-8.4"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0H24V24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ProductHuntIcon;
