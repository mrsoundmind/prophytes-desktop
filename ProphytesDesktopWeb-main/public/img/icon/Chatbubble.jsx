import * as React from "react";

const Chatbubble = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.7}
      strokeWidth={1.5}
      clipPath="url(#a)"
    >
      <path d="M11.438 17.5a1.666 1.666 0 0 1-2.883 0M15.527 10.834a14.909 14.909 0 0 1-.525-4.167M5.217 5.217c-.145.47-.218.958-.217 1.45 0 5.833-2.5 7.5-2.5 7.5h11.667M15.002 6.667A5 5 0 0 0 7.227 2.5M.836.833l18.333 18.333" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Chatbubble;
