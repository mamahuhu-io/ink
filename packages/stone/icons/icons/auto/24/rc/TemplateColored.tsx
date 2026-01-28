import type { SVGProps } from 'react';
import * as React from 'react';
const TemplateColoredIcon = (props: SVGProps<SVGSVGElement>) => (
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
      fill="#29A3FA"
      fillRule="evenodd"
      d="M19.563 10.75a4.25 4.25 0 0 0-7.315-3.987l1.937 3.987h5.378"
      clipRule="evenodd"
    />
    <path
      fill="#FB7081"
      fillRule="evenodd"
      d="M10.792 4.909a.75.75 0 0 0-1.342-.016l-3.018 5.87q.102-.013.208-.013h6.989z"
      clipRule="evenodd"
    />
    <path
      fill="#FCD34D"
      fillRule="evenodd"
      d="M5.436 12.165a1.25 1.25 0 0 1 1.205-.915h12.886a1.25 1.25 0 0 1 1.204 1.585l-1.666 6a1.25 1.25 0 0 1-1.205.915H4.974a1.25 1.25 0 0 1-1.205-1.585z"
      clipRule="evenodd"
    />
    <path
      fill="#FCD34D"
      fillRule="evenodd"
      d="m7.162 8.25-1.41 2.743c-.381.224-.673.59-.798 1.039l-1.666 6q-.024.083-.038.164V9.5c0-.69.56-1.25 1.25-1.25z"
      clipRule="evenodd"
    />
  </svg>
);
export default TemplateColoredIcon;
