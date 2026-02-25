import * as React from "react";

const TikSvg = (props) => (
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
      strokeWidth={3}
      d="m16.662 5-9.167 9.167L3.328 10"
    />
  </svg>
);
export default TikSvg;
