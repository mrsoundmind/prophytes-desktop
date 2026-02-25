import * as React from "react";

const BookSvg = (props) => (
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
      strokeWidth={1.5}
      d="M1.664 2.5h5a3.333 3.333 0 0 1 3.333 3.333V17.5a2.5 2.5 0 0 0-2.5-2.5H1.664V2.5ZM18.333 2.5h-5A3.333 3.333 0 0 0 10 5.833V17.5a2.5 2.5 0 0 1 2.5-2.5h5.833V2.5Z"
    />
  </svg>
);
export default BookSvg;
