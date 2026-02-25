import * as React from "react";

const AngleBottom = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5 8.5 5 5 5-5"
    />
  </svg>
);
export default AngleBottom;
