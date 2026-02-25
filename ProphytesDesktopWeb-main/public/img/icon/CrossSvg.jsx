import * as React from "react";

const CrossSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={2}
      d="M1 13 13.003 1M1 1l12.003 12"
    />
  </svg>
);
export default CrossSvg;
