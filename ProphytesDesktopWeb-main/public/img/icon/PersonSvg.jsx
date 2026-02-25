import * as React from "react";

const PersonSvg = (props) => (
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
      strokeWidth={2}
      d="M16.67 17.5v-1.667a3.333 3.333 0 0 0-3.334-3.333H6.669a3.333 3.333 0 0 0-3.333 3.333V17.5M9.997 9.167a3.333 3.333 0 1 0 0-6.667 3.333 3.333 0 0 0 0 6.667Z"
    />
  </svg>
);
export default PersonSvg;
