import * as React from "react";
const MettingSvg = (props) => (
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
      d="M13.444 4H2.556C1.696 4 1 4.696 1 5.556v10.888C1 17.304 1.696 18 2.556 18h10.888c.86 0 1.556-.696 1.556-1.556V5.556C15 4.696 14.304 4 13.444 4ZM11 2v3M5 2v3M1 8h14"
    />
  </svg>
);
export default MettingSvg;
