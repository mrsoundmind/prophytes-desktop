import * as React from "react";

const DangerSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M9.987 15.071a2.475 2.475 0 0 0-2.471 2.472c.124 3.275 4.82 3.274 4.943 0a2.475 2.475 0 0 0-2.472-2.472ZM12.463 1.141C11.237-.38 8.75-.38 7.522 1.141a3.22 3.22 0 0 0-.708 2.632l1.496 8.545c.348 1.872 3.017 1.872 3.365 0l1.496-8.545a3.22 3.22 0 0 0-.708-2.632Z"
    />
  </svg>
);
export default DangerSvg;
