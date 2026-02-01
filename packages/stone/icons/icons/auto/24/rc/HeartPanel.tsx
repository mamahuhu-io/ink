import type { SVGProps } from 'react';
import * as React from 'react';
const HeartPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.035 7.466C10.894 4.826 7.463 4.144 5.4 6.148a4.933 4.933 0 0 0-.104 6.975l6.328 6.518a.5.5 0 0 0 .707.01l6.547-6.355a4.893 4.893 0 0 0 .103-6.918c-2.005-2.065-5.459-1.46-6.643 1.162l-.137.306z"
    />
  </svg>
);
export default HeartPanelIcon;
