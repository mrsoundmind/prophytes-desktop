import * as React from "react";
import { SVGProps } from "react";
const CloseCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#EA4335"
      d="M10 2a8 8 0 0 0-8 8 8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8Zm3.707 10.293a1 1 0 0 1-1.414 1.414L10 11.414l-2.293 2.293A.997.997 0 0 1 6 13a1 1 0 0 1 .293-.707L8.586 10 6.293 7.707a1 1 0 1 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 1 1 1.414 1.414L11.414 10l2.293 2.293Z"
    />
  </svg>
);
export default CloseCircle;
