import * as React from "react";

const ChapterImage = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1.336 2h4a2.667 2.667 0 0 1 2.667 2.667V14a2 2 0 0 0-2-2H1.336z"
    ></path>
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.667 2h-4A2.667 2.667 0 0 0 8 4.667V14a2 2 0 0 1 2-2h4.667z"
    ></path>
  </svg>
);

export default ChapterImage;
