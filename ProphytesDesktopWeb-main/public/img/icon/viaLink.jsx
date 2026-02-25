import * as React from "react";

const ViaLink = (props) => (
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
      strokeOpacity={0.7}
      strokeWidth={1.5}
      d="M12.503 5.833h2.5a4.166 4.166 0 1 1 0 8.333h-2.5m-5 0h-2.5a4.166 4.166 0 1 1 0-8.333h2.5M6.664 10h6.667"
    />
  </svg>
);
export default ViaLink;
