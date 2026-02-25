import * as React from "react";

const LeftAngleSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={14}
    fill="none"
    viewBox="0 0 18 14"
    {...props}
  >
    <path fill="currentColor" d="M17.75 7.752H.25v-1.5h17.5v1.5Z" />
    <path
      fill="currentColor"
      d="M17 6.244c-3.528 0-6.41 3.102-6.41 6.41v.75h1.5v-.75c0-2.511 2.242-4.91 4.91-4.91h.75v-1.5H17Z"
    />
    <path
      fill="currentColor"
      d="M17.004 7.748c-3.528 0-6.41-3.102-6.41-6.41v-.75h1.5v.75c0 2.511 2.242 4.91 4.91 4.91h.75v1.5h-.75Z"
    />
  </svg>
);
export default LeftAngleSvg;
