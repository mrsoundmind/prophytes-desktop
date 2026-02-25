import * as React from "react";

const LinkIconSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.836 10.833a4.167 4.167 0 0 0 6.283.45l2.5-2.5a4.167 4.167 0 0 0-5.891-5.891l-1.434 1.425"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.164 9.167a4.167 4.167 0 0 0-6.283-.45l-2.5 2.5a4.166 4.166 0 0 0 5.891 5.891l1.425-1.425"
    />
  </svg>
);
export default LinkIconSvg;
