import * as React from "react";

const Membericon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.402 12.4v-1.066c0-.566-.232-1.109-.645-1.509A2.235 2.235 0 0 0 8.202 9.2h-4.4c-.584 0-1.143.225-1.556.625-.413.4-.644.943-.644 1.509V12.4"
    />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.402 11.6v1.066c0 .566-.232 1.109-.645 1.509-.412.4-.972.625-1.555.625h-4.4a2.236 2.236 0 0 1-1.556-.625 2.101 2.101 0 0 1-.644-1.509V11.6M6.003 7.333a2.667 2.667 0 1 0 0-5.333 2.667 2.667 0 0 0 0 5.333ZM10.664 2.086a2.667 2.667 0 0 1 0 5.167"
    />
    <rect width={8} height={8} x={8} y={8} fill="#fff" rx={4} />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.8}
      d="M12 10v4M10 12h4"
    />
  </svg>
);
export default Membericon;
