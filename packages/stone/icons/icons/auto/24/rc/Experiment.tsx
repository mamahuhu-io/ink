import type { SVGProps } from 'react';
import * as React from 'react';
const ExperimentIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20.624 3.584a.75.75 0 0 1-.208 1.04l-.745.497a8.75 8.75 0 0 1-6.92 12.93v1.199h3.694a.75.75 0 0 1 0 1.5h-8.89a.75.75 0 0 1 0-1.5h3.695v-1.198a8.74 8.74 0 0 1-6.088-3.259l-.746.498a.75.75 0 1 1-.832-1.248l1.333-.89a.75.75 0 0 1 .423-.125.75.75 0 0 1 .63.333 7.25 7.25 0 0 0 12.072-8.036.75.75 0 0 1-.125-.428.75.75 0 0 1 .334-.632l1.333-.889a.75.75 0 0 1 1.04.208M12 5.639a3.694 3.694 0 1 0 0 7.389 3.694 3.694 0 0 0 0-7.39M6.806 9.333a5.194 5.194 0 1 1 10.389 0 5.194 5.194 0 0 1-10.39 0"
      clipRule="evenodd"
    />
  </svg>
);
export default ExperimentIcon;
