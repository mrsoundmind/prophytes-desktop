import * as React from "react";

const ThreeDotSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#E9EFF0"
      d="M14.167 10.001a1.667 1.667 0 1 1 3.333 0 1.667 1.667 0 0 1-3.333 0Zm-5.834 0a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0Zm-5.833 0a1.667 1.667 0 1 1 3.333 0 1.667 1.667 0 0 1-3.333 0Z"
    />
  </svg>
);
export default ThreeDotSvg;
