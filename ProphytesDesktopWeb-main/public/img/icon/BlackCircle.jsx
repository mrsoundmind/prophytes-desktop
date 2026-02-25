import * as React from "react";

const BlackCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M8 16A7.999 7.999 0 1 0 8 .002 7.999 7.999 0 0 0 8 16Zm-.206-4.764 4.444-5.334-1.365-1.138L7.05 9.35 5.073 7.372 3.816 8.628l2.667 2.667.688.688.623-.747Z"
      clipRule="evenodd"
    />
  </svg>
);
export default BlackCircle;
