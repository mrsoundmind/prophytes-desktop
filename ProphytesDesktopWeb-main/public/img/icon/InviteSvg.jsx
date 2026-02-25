import * as React from "react";

const InviteSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <mask
      id="a"
      width={16}
      height={16}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <path fill="currentColor" d="M.93.54h14.94v14.94H.93V.54Z" />
    </mask>
    <g mask="url(#a)">
      <path
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={0.875}
        d="M9.268 8.01a8.57 8.57 0 0 0-7.631 4.728l-.278.639v-.96c0-4.352 3.557-7.908 7.909-7.908v-3.05l5.894 4.8-5.894 4.816V8.01Z"
      />
    </g>
  </svg>
);
export default InviteSvg;
