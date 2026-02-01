import type { SVGProps } from 'react';
import * as React from 'react';
const BookmarkIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 3.25A2.75 2.75 0 0 0 2.25 6v7a.75.75 0 0 0 1.5 0V6c0-.69.56-1.25 1.25-1.25h14c.69 0 1.25.56 1.25 1.25v12c0 .69-.56 1.25-1.25 1.25h-7a.75.75 0 0 0 0 1.5h7A2.75 2.75 0 0 0 21.75 18V6A2.75 2.75 0 0 0 19 3.25zm4.116 9.866a1.25 1.25 0 0 1 1.768 1.768l-2 2a1.25 1.25 0 0 1-1.768 0 .75.75 0 0 0-1.06 1.06 2.75 2.75 0 0 0 3.889 0l2-2a2.75 2.75 0 1 0-3.89-3.889l-.55.55a.75.75 0 1 0 1.061 1.06zm-3 3a1.25 1.25 0 0 1 1.768 0 .75.75 0 0 0 1.06-1.06 2.75 2.75 0 0 0-3.889 0l-2 2a2.75 2.75 0 1 0 3.89 3.889l.55-.551a.75.75 0 0 0-1.06-1.06l-.551.55a1.25 1.25 0 0 1-1.768-1.768z"
      clipRule="evenodd"
    />
  </svg>
);
export default BookmarkIcon;
