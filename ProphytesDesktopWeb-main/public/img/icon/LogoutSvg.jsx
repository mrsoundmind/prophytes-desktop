import * as React from "react";
import { SVGProps } from "react";
const LogoutSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      d="M5 5.417C3.466 6.79 2.5 8.612 2.5 10.833a7.5 7.5 0 0 0 15 0c0-2.22-.966-4.043-2.5-5.416M10 1.667v7.5m0-7.5c-.584 0-1.674 1.662-2.083 2.083M10 1.667c.583 0 1.674 1.662 2.083 2.083"
    />
  </svg>
);
export default LogoutSvg;
