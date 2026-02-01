import type { SVGProps } from 'react';
import * as React from 'react';
const ToggleRightIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15.632 11.35a.757.757 0 0 1 0 1.3l-5.527 3.248c-.491.29-1.105-.072-1.105-.65V8.752c0-.577.614-.938 1.105-.65z"
    />
  </svg>
);
export default ToggleRightIcon;
