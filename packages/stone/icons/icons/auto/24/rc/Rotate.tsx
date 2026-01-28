import type { SVGProps } from 'react';
import * as React from 'react';
const RotateIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.235 21.318C3.748 21.318 3 20.612 3 19.087v-8.62c0-1.525.748-2.24 2.235-2.24h8.62c1.488 0 2.236.715 2.236 2.24v8.62c0 1.525-.748 2.231-2.236 2.231zm.027-1.403h8.567c.6 0 .861-.244.861-.854v-8.576c0-.61-.26-.854-.86-.854H5.261c-.592 0-.862.244-.862.854v8.576c0 .61.27.854.862.854M20.424 10.682a.57.57 0 0 1-.567-.571V8.73c0-1.962-1.252-3.343-3.236-3.343h-.183v1.179c0 .663-.512.82-1.024.442L13.11 5.313c-.394-.285-.384-.617 0-.902l2.304-1.704c.512-.386 1.024-.23 1.024.452v1.16h.192c2.624 0 4.37 1.777 4.37 4.41v1.382a.58.58 0 0 1-.576.57"
    />
  </svg>
);
export default RotateIcon;
