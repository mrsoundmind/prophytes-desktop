import * as React from "react";
const DeclineSvg = (props) => (
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
      strokeWidth={1.5}
      d="m15.5 5-10 10M5.5 5l10 10"
    />
  </svg>
);
export default DeclineSvg;
