import * as React from "react";

const StatusSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.997 12.499a5.833 5.833 0 1 0 0-11.667 5.833 5.833 0 0 0 0 11.667Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m6.844 11.575-1.008 7.591 4.167-2.5 4.166 2.5-1.008-7.6"
    />
  </svg>
);
export default StatusSvg;
