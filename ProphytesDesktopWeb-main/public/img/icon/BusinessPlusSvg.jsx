import * as React from "react";

const BusinessPlusSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 4.164v11.667M4.164 10h11.667"
    />
  </svg>
);
export default BusinessPlusSvg;
