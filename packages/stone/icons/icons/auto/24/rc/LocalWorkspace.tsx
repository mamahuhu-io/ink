import type { SVGProps } from 'react';
import * as React from 'react';
const LocalWorkspaceIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.75 5.389A2.64 2.64 0 0 1 5.389 2.75H18.61a2.64 2.64 0 0 1 2.639 2.639v9.444a2.64 2.64 0 0 1-2.639 2.64h-3.525l.425 1.7.797.797a.75.75 0 0 1-.53 1.28H8.222a.75.75 0 0 1-.53-1.28l.797-.798.425-1.7H5.39a2.64 2.64 0 0 1-2.639-2.639zm1.5 8.305v1.14c0 .628.51 1.138 1.139 1.138h13.223c.628 0 1.138-.51 1.138-1.139v-1.139zm15.5-1.5H4.25V5.39c0-.63.51-1.139 1.139-1.139H18.61c.63 0 1.139.51 1.139 1.139zm-6.21 5.278h-3.08l-.566 2.265-.003.013h4.218l-.003-.012z"
      clipRule="evenodd"
    />
  </svg>
);
export default LocalWorkspaceIcon;
