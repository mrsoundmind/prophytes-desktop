import * as React from "react";

const MuteSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={11}
    fill="none"
    {...props}
  >
    <g fill="#000" clipPath="url(#a)">
      <path d="M7.86.859a.357.357 0 0 0-.2-.322.348.348 0 0 0-.38.043L4.118 3.101 7.86 6.843V.86ZM9.894 9.89.609.607a.357.357 0 0 0-.505.505L2.351 3.36h-.209c-.221 0-.414.1-.543.257a.696.696 0 0 0-.171.457V6.93c0 .392.321.714.714.714h1.657l3.478 2.778c.064.05.143.079.221.079a.357.357 0 0 0 .357-.357V8.862l1.533 1.533a.356.356 0 0 0 .506 0 .358.358 0 0 0 0-.505Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .5h10v10H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default MuteSvg;
