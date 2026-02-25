import * as React from "react";

const MapPinSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <path d="M17.5 8.334c0 5.833-7.5 10.833-7.5 10.833s-7.5-5-7.5-10.833a7.5 7.5 0 0 1 15 0Z" />
      <path d="M10 10.834a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default MapPinSvg;
