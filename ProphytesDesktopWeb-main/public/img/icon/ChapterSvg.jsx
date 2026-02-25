import * as React from "react";

const ChapterSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.811 22.702c5.7 0 10.32-4.62 10.32-10.32 0-5.699-4.62-10.319-10.32-10.319-5.699 0-10.319 4.62-10.319 10.32 0 5.699 4.62 10.319 10.32 10.319Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.523 7.834c6.192 1.783 7.74-2.675 16.51-2.675"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.492 12.383c9.287 0 11.351-6.71 16.51-7.224M19.003 20.514c-5.45 1.305-11.925-8.131-16.51-8.131"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.555 18.575c6.707 0 11.026-8.256 17.542-8.256"
    />
  </svg>
);
export default ChapterSvg;
