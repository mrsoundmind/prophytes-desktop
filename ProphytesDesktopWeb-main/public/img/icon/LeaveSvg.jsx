import * as React from "react";

const LeaveSvg = (props) => (
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
      d="M13.336 17.5v-1.667a3.333 3.333 0 0 0-3.333-3.333H4.169a3.333 3.333 0 0 0-3.333 3.333V17.5M7.083 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667ZM19.164 9.167h-5"
    />
  </svg>
);
export default LeaveSvg;
