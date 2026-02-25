import * as React from "react";

const CircleSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.067}
      d="M7.999 14.666a6.667 6.667 0 1 0 0-13.333 6.667 6.667 0 0 0 0 13.333Z"
    />
    <path
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.067}
      d="M7.16 10.353 9.507 8 7.16 5.646"
    />
  </svg>
);
export default CircleSvg;
