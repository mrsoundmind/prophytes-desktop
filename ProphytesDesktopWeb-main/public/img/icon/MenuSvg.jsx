import * as React from "react";

const MenuSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="#9E9E9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.203 5.16h16.51M4.203 12.383h16.51M4.203 19.606h16.51"
    />
  </svg>
);
export default MenuSvg;
