import type { SVGProps } from 'react';
import * as React from 'react';
const UndoIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8.53 4.47a.75.75 0 0 1 0 1.06L5.81 8.25h4.624c1.651 0 2.937 0 3.968.084 1.047.086 1.897.262 2.662.652a6.75 6.75 0 0 1 2.95 2.95c.39.765.566 1.615.652 2.662.084 1.031.084 2.317.084 3.968v.034a.75.75 0 0 1-1.5 0c0-1.693 0-2.917-.08-3.88-.077-.954-.228-1.585-.492-2.104a5.25 5.25 0 0 0-2.295-2.294c-.518-.264-1.15-.415-2.103-.493-.963-.078-2.187-.079-3.88-.079H5.81l2.72 2.72a.75.75 0 1 1-1.06 1.06l-4-4a.75.75 0 0 1 0-1.06l4-4a.75.75 0 0 1 1.06 0"
      clipRule="evenodd"
    />
  </svg>
);
export default UndoIcon;
