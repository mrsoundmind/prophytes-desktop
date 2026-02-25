import * as React from "react";

const ShieldSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#A2A2A8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.997 14.665S13.331 12 13.331 8V3.332l-5.334-2-5.333 2v4.667c0 4 5.333 6.666 5.333 6.666Z"
    />
  </svg>
);
export default ShieldSvg;
