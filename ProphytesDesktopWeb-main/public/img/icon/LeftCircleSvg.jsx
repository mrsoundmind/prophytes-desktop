import * as React from "react";

const LeftCircleSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.067}
      d="M10.001 18.334a8.333 8.333 0 1 0 0-16.667 8.333 8.333 0 0 0 0 16.667Z"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.067}
      d="M11.05 12.94 8.117 10l2.933-2.942"
    />
  </svg>
);
export default LeftCircleSvg;
