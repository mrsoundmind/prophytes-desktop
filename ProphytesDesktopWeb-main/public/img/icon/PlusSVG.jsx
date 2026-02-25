import * as React from "react";

const PlusSVG = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#141616"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.5}
      d="M12 5v14M5 12h14"
    />
  </svg>
);
export default PlusSVG;
