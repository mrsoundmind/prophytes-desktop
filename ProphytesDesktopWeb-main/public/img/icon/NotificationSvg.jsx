import * as React from "react";

const NotificationSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#E9EFF0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M14 6.666a5 5 0 0 0-10 0c0 5.833-2.5 7.5-2.5 7.5h15s-2.5-1.667-2.5-7.5Z"
    />
  </svg>
);
export default NotificationSvg;
