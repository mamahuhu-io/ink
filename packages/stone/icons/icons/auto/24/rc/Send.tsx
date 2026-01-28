import type { SVGProps } from 'react';
import * as React from 'react';
const SendIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20.088 4.143s1.804-.703 1.653 1.005c-.05.704-.5 3.166-.851 5.828l-1.203 7.888s-.1 1.156-1.002 1.357c-.902.2-2.255-.703-2.506-.904-.2-.151-3.757-2.412-5.01-3.517-.351-.302-.752-.905.05-1.608l5.26-5.025c.602-.602 1.203-2.009-1.302-.3l-7.015 4.772s-.802.503-2.305.05L2.6 12.685s-1.203-.753.852-1.507c5.01-2.361 11.174-4.772 16.635-7.034z"
    />
  </svg>
);
export default SendIcon;
