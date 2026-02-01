import type { SVGProps } from 'react';
import * as React from 'react';
const QrCodePanelIcon = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 9V6h3v3zM4 5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm2 13v-3h3v3zm-2-4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm11-8v3h3V6zm-1-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm2 9h-3v3h2v1h-2v3h3v-2h1v2h3v-3h-2v-1h2v-3h-3v2h-1z"
      clipRule="evenodd"
    />
  </svg>
);
export default QrCodePanelIcon;
