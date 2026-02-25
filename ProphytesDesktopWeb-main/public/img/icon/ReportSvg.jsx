import * as React from "react";
import { SVGProps } from "react";
const ReportSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={44}
    height={44}
    fill="none"
    {...props}
  >
    <path
      fill="#EA4335"
      d="M22 0C9.848 0 0 9.85 0 22s9.848 22 22 22 22-9.85 22-22S34.152 0 22 0Zm10.194 28.306a2.75 2.75 0 1 1-3.888 3.888L22 25.888l-6.306 6.306a2.739 2.739 0 0 1-3.888 0 2.75 2.75 0 0 1 0-3.888L18.112 22l-6.306-6.306a2.75 2.75 0 1 1 3.888-3.888L22 18.112l6.306-6.306a2.75 2.75 0 1 1 3.888 3.888L25.888 22l6.306 6.306Z"
    />
  </svg>
);
export default ReportSvg;
