import * as React from "react";

const BusinessSvg = (props) => (
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
      d="M16.664 5.832H3.331c-.92 0-1.667.746-1.667 1.667v8.333c0 .92.746 1.667 1.667 1.667h13.333c.92 0 1.667-.746 1.667-1.667V7.499c0-.92-.747-1.667-1.667-1.667Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.33 17.5V4.167A1.667 1.667 0 0 0 11.665 2.5H8.331a1.667 1.667 0 0 0-1.667 1.667V17.5"
    />
  </svg>
);
export default BusinessSvg;
