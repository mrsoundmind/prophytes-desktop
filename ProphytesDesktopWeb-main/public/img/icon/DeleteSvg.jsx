import * as React from "react";

const DeleteSvg = (props) => (
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
      strokeOpacity={0.7}
      strokeWidth={1.5}
      d="M2.5 5h15M15.83 5v11.667a1.667 1.667 0 0 1-1.666 1.667H5.831a1.667 1.667 0 0 1-1.667-1.667V5m2.5 0V3.334a1.667 1.667 0 0 1 1.667-1.667h3.333a1.667 1.667 0 0 1 1.667 1.667V5M8.336 9.167v5M11.664 9.167v5"
    />
  </svg>
);
export default DeleteSvg;
