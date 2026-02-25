import * as React from "react";

const Share = (props) => (
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
      strokeWidth={1.5}
      d="M15 6.668a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM5 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM15 18.332a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM7.156 11.258l5.692 3.317M12.84 5.426 7.156 8.742"
    />
  </svg>
);
export default Share;
