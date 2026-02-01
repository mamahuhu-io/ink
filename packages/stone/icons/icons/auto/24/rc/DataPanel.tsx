import type { SVGProps } from 'react';
import * as React from 'react';
const DataPanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 4.714c0-.67.544-1.214 1.214-1.214h14.572c.67 0 1.214.544 1.214 1.214v2.429c0 .67-.544 1.214-1.214 1.214H4.214C3.544 8.357 3 7.813 3 7.143zM4.428 5.93a1 1 0 1 0 2 0 1 1 0 0 0-2 0m-.214 3.643c-.67 0-1.214.543-1.214 1.214v2.428c0 .671.544 1.215 1.214 1.215h14.572c.67 0 1.214-.544 1.214-1.215v-2.428c0-.67-.544-1.214-1.214-1.214zM5.43 13a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-1.215 2.5c-.67 0-1.214.544-1.214 1.214v2.429c0 .67.544 1.214 1.214 1.214h14.572c.67 0 1.214-.543 1.214-1.214v-2.429c0-.67-.544-1.214-1.214-1.214zm1.215 3.429a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
      clipRule="evenodd"
    />
  </svg>
);
export default DataPanelIcon;
