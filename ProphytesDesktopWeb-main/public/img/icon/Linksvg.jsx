import * as React from "react";

const LinkSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m20 11.438-8.037 8.026a5.254 5.254 0 0 1-7.425 0 5.24 5.24 0 0 1 0-7.414l8.037-8.026a3.503 3.503 0 0 1 5.975 2.471c0 .927-.369 1.816-1.025 2.472l-8.046 8.026a1.751 1.751 0 0 1-2.988-1.236c0-.463.185-.908.513-1.236l7.425-7.406"
    />
  </svg>
);
export default LinkSvg;
