import type { SVGProps } from 'react';
import * as React from 'react';
const SmileIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3.75A8.213 8.213 0 0 0 3.75 12 8.213 8.213 0 0 0 12 20.25 8.213 8.213 0 0 0 20.25 12 8.213 8.213 0 0 0 12 3.75M2.25 12A9.713 9.713 0 0 1 12 2.25 9.713 9.713 0 0 1 21.75 12 9.713 9.713 0 0 1 12 21.75 9.713 9.713 0 0 1 2.25 12M8.5 7.75a.75.75 0 0 1 .75.75V10a.75.75 0 0 1-1.5 0V8.5a.75.75 0 0 1 .75-.75m7 0a.75.75 0 0 1 .75.75V10a.75.75 0 0 1-1.5 0V8.5a.75.75 0 0 1 .75-.75m-8.682 5.522a.75.75 0 0 1 .91.546C8.134 15.443 9.683 16.75 12 16.75s3.866-1.307 4.272-2.932a.75.75 0 0 1 1.456.364c-.594 2.376-2.812 4.068-5.728 4.068s-5.134-1.692-5.728-4.068a.75.75 0 0 1 .546-.91"
      clipRule="evenodd"
    />
  </svg>
);
export default SmileIcon;
