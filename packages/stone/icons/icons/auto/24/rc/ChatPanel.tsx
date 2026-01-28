import type { SVGProps } from 'react';
import * as React from 'react';
const ChatPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6.065 4C4.925 4 4 4.924 4 6.065v7.225c0 1.14.924 2.065 2.065 2.065v3.399c0 .46.555.69.88.365l3.765-3.764h7.742c1.14 0 2.064-.925 2.064-2.065V6.065c0-1.14-.924-2.065-2.064-2.065z"
    />
  </svg>
);
export default ChatPanelIcon;
