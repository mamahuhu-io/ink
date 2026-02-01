import type { SVGProps } from 'react';
import * as React from 'react';
const NightPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.522 12.783A3.48 3.48 0 0 0 22 9.304c0-.187-.28-.22-.386-.067a2.174 2.174 0 1 1-3.025-3.025c.154-.106.12-.386-.067-.386a3.48 3.48 0 0 0-3.475 3.313 4 4 0 0 1 2.945 3.604q.26.04.53.04M5.478 18a3.478 3.478 0 0 1 0-6.957 4.348 4.348 0 0 1 8.613-.849 3.044 3.044 0 0 1 2.653 3.51q.228-.052.473-.052a2.174 2.174 0 0 1 0 4.348z"
      clipRule="evenodd"
    />
  </svg>
);
export default NightPanelIcon;
