import * as React from "react";

const ConfirmSvg = ({ bgColor = "#000", strokeColor = "#fff", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={20} height={20} fill={bgColor} rx={10} />
    <path
      stroke={strokeColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14 7-5.5 5.5L6 10"
    />
  </svg>
);

export default ConfirmSvg;
