import React from "react";

const MemberButtonSkeleton = () => {
  return (
    <div className="xs:flex items-center sm:gap-[30px] gap-4 sm:mt-0 mt-1">
      {/* Button 1 Skeleton */}
      <div className="relative group animate-pulse">
        <button className="relative flex w-full xs:gap-[10px] gap-[7px] items-center sm:text-[16px] text-[14px] leading-5 font-bold sm:py-[15px] py-[14px] sm:px-5 px-[13px] rounded-full overflow-hidden border border-gray-300 bg-gray-300 text-transparent">
          <span className="z-[99] relative w-[20px] h-[20px] bg-gray-400 rounded-full"></span>
          <span className="z-[1001] w-[80px] h-[16px] bg-gray-400 rounded"></span>
        </button>

        <div className="absolute bottom-full left-1/2 mt-3 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-[100]">
          <div className="sm:text-base text-sm font-bold sm:px-3 px-2 sm:py-3 py-2 rounded-md bg-gray-300 text-transparent w-[100px] h-[20px]"></div>
          <div className="w-2 h-2 bg-gray-300 rotate-45 -mt-[4px]"></div>
        </div>
      </div>
    </div>
  );
};

export default MemberButtonSkeleton;
