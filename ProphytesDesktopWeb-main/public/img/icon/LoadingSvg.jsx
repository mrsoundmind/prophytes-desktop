import * as React from "react";

const LoadingSvg = (props) => (
  <svg width={24} height={24} fill="none" {...props}>
    <circle cx={12} cy={12} r={10} stroke="currentColor" />
  </svg>
);
export default LoadingSvg;
