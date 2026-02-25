import * as React from "react";

const CheckCircleSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <rect width={19} height={19} x={0.5} y={0.5} fill="#000" rx={9.5} />
    <rect width={19} height={19} x={0.5} y={0.5} stroke="#383838" rx={9.5} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14 7-5.5 5.5L6 10"
    />
  </svg>
);
export default CheckCircleSvg;
