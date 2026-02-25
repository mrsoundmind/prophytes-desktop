import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={30}
    fill="none"
    viewBox="0 0 56 56"
    {...props}
  >
    <rect width={56} height={56} fill="#16AD4B" rx={28} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m20.758 28 4.82 4.84 9.66-9.68"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M25.506 8.9c1.38-1.18 3.64-1.18 5.04 0l3.16 2.72c.6.52 1.72.94 2.52.94h3.4c2.12 0 3.86 1.74 3.86 3.86v3.4c0 .78.42 1.92.94 2.52l2.72 3.16c1.18 1.38 1.18 3.64 0 5.04l-2.72 3.16c-.52.6-.94 1.72-.94 2.52v3.4c0 2.12-1.74 3.86-3.86 3.86h-3.4c-.78 0-1.92.42-2.52.94l-3.16 2.72c-1.38 1.18-3.64 1.18-5.04 0l-3.16-2.72c-.6-.52-1.72-.94-2.52-.94h-3.46c-2.12 0-3.86-1.74-3.86-3.86V36.2c0-.78-.42-1.9-.92-2.5l-2.7-3.18c-1.16-1.38-1.16-3.62 0-5l2.7-3.18c.5-.6.92-1.72.92-2.5V16.4c0-2.12 1.74-3.86 3.86-3.86h3.46c.78 0 1.92-.42 2.52-.94l3.16-2.7Z"
    />
  </svg>
);
export default SvgComponent;
