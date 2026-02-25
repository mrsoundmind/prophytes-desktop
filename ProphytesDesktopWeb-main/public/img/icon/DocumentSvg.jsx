import * as React from "react";

const DocumentSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="currentColor"
    {...props}
  >
    <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
    <text
      x={6}
      y={19}
      fill="red"
      fontFamily="Arial"
      fontSize={7}
      fontWeight="bold"
    >
      {"\n          PDF\n        "}
    </text>
  </svg>
);
export default DocumentSvg;
