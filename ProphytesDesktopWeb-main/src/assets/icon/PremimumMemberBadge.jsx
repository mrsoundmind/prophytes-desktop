import * as React from "react";
const PremimumMemberBadge = (props) => (
  <div className="flex items-center justify-center gap-1 px-3 transition-all duration-500 ease-in-out rounded-3xl">
    <div className="  w-[28px] h-[28px] flex items-center justify-center rounded-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
      >
        <path
          fill="currentColor"
          d="M4.164 16.667V15h11.667v1.667H4.164Zm0-2.917L3.102 7.063a.471.471 0 0 0-.095.01.425.425 0 0 1-.093.01c-.347 0-.642-.121-.885-.364a1.21 1.21 0 0 1-.365-.885 1.2 1.2 0 0 1 .365-.885c.244-.244.539-.365.885-.365s.641.121.886.365c.244.243.366.538.364.885a1.1 1.1 0 0 1-.032.27c-.02.084-.045.16-.072.23L6.664 7.5l2.604-3.562a1.282 1.282 0 0 1-.52-1.021c0-.347.121-.643.364-.886.244-.243.539-.365.885-.364.347 0 .642.122.886.365s.366.538.364.885a1.284 1.284 0 0 1-.52 1.02L13.33 7.5l2.604-1.166a1.818 1.818 0 0 1-.073-.23 1.078 1.078 0 0 1-.031-.27c0-.348.121-.643.365-.886.243-.244.538-.365.885-.364.346 0 .642.122.886.365.244.242.365.537.364.885a1.216 1.216 0 0 1-.364.885 1.198 1.198 0 0 1-.886.365.495.495 0 0 1-.094-.01.555.555 0 0 0-.094-.011l-1.062 6.687H4.164Z"
        />
      </svg>
    </div>
    <p className="text-sm font-medium text-black ">Elite</p>
  </div>
);
export default PremimumMemberBadge;
