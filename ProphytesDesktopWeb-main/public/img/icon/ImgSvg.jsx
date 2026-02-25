import * as React from "react";

const ImgSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={41}
    height={40}
    fill="none"
    {...props}
  >
    <path
      stroke="#898A8A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M32.167 5H8.833A3.333 3.333 0 0 0 5.5 8.333v23.334A3.333 3.333 0 0 0 8.833 35h23.334a3.333 3.333 0 0 0 3.333-3.333V8.333A3.333 3.333 0 0 0 32.167 5Z"
    />
    <path
      stroke="#898A8A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.664 16.666a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM35.503 25l-8.334-8.334L8.836 34.999"
    />
  </svg>
);
export default ImgSvg;
