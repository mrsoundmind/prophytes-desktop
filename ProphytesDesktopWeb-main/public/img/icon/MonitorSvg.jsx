import * as React from "react";

const MonitorSvg = (props) => (
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
      d="M16.664 2.5H3.331c-.92 0-1.667.746-1.667 1.667V12.5c0 .92.746 1.667 1.667 1.667h13.333c.92 0 1.667-.746 1.667-1.667V4.167c0-.92-.747-1.667-1.667-1.667ZM6.664 17.5h6.667M10 14.167V17.5"
    />
  </svg>
);
export default MonitorSvg;
