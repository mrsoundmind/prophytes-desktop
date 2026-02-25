import * as React from "react";

const VideoSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <rect width={24} height={24} fill="#f3f3f3" rx={4} />
    <path fill="#A020F0" d="M9 7v10l8-5-8-5z" />
  </svg>
);
export default VideoSvg;
