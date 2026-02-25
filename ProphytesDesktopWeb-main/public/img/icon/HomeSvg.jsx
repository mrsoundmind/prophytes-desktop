import * as React from "react";

const HomeSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M12.578 18.574v-3.096"
    />
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.62 13.635c-.364-2.37-.546-3.556-.098-4.607.448-1.05 1.443-1.77 3.431-3.207L7.44 4.746c2.474-1.788 3.71-2.683 5.138-2.683 1.427 0 2.664.895 5.138 2.683L19.2 5.821c1.988 1.438 2.982 2.156 3.43 3.207.449 1.05.267 2.236-.098 4.607l-.31 2.021c-.517 3.36-.775 5.04-1.98 6.043-1.205 1.003-2.967 1.003-6.491 1.003h-2.35c-3.524 0-5.286 0-6.491-1.003-1.205-1.002-1.464-2.683-1.98-6.043l-.31-2.021Z"
    />
  </svg>
);
export default HomeSvg;
