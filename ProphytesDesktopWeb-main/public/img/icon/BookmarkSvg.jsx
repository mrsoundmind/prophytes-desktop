import * as React from "react";

const BookmarkSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.7}
      strokeWidth={1.5}
      d="m15.83 17.5-5.833-4.167L4.164 17.5V4.167A1.667 1.667 0 0 1 5.831 2.5h8.333a1.667 1.667 0 0 1 1.667 1.667V17.5Z"
    />
  </svg>
);
export default BookmarkSvg;
