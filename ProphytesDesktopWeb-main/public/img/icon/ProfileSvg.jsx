import * as React from "react";

const ProfileSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      d="M11.667 7.083a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0Z"
    />
    <path
      stroke="currentColor"
      d="M13.333 17.083a5.833 5.833 0 0 0-11.666 0M18.074 6.612l-.519-.52a.886.886 0 0 0-1.252 0l-2.619 2.711a1.25 1.25 0 0 0-.35.869v1.161h1.161c.324 0 .635-.126.869-.35l2.71-2.619a.886.886 0 0 0 0-1.252Z"
    />
  </svg>
);
export default ProfileSvg;
