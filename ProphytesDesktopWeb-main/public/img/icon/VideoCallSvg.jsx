import * as React from "react";

const VideoCallSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#E9EFF0"
      d="M16.764 6.355a.833.833 0 0 0-.47.083L12.5 8.334v3.334l3.794 1.895a.832.832 0 0 0 1.206-.743V7.182a.833.833 0 0 0-.736-.827Z"
    />
    <path
      fill="#E9EFF0"
      d="M4.164 4.168c-1.37 0-2.5 1.13-2.5 2.5v6.667c0 1.37 1.13 2.5 2.5 2.5h6.667c1.37 0 2.5-1.13 2.5-2.5V6.668c0-1.37-1.13-2.5-2.5-2.5H4.164Z"
    />
  </svg>
);
export default VideoCallSvg;
