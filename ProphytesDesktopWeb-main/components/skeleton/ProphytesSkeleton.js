import React from "react";

const ProphytesSkeleton = () => {
  return (
    <div className="bg-black border border-[#383838] rounded-[20px] sm:p-9 p-4 overflow-hidden animate-pulse">
      {/* Top Section */}
      <div
        className="grid items-start grid-cols-1 gap-4 p-4 sm:p-7 rounded-xl sm:grid-cols-2"
        style={{
          background:
            "linear-gradient(180deg, rgba(56,56,56,0.5) 0%, rgba(20,22,22,0.5) 100%)",
        }}
      >
        {/* Org Logo */}
        <div className="flex justify-start">
          <div className="h-20 w-20 rounded-full bg-[#383838]" />
        </div>

        {/* Prophyte Image */}
        <div className="overflow-hidden rounded-[20px] h-[160px] w-full sm:w-[225px] bg-[#383838]" />

        {/* Name + Org */}
        <div className="sm:col-start-1 sm:row-start-2">
          <div className="h-6 w-40 bg-[#383838] rounded mb-2" />
          <div className="h-4 w-28 bg-[#383838] rounded" />
        </div>
      </div>

      {/* Content Box */}
      <div className="font-inter bg-[#141616] sm:px-7 px-4 sm:py-6 py-4 rounded-[16px] border border-[#383838] mt-4">
        {/* Chapter */}
        <div className="h-5 w-32 bg-[#383838] rounded mb-4" />

        {/* Description (mobile) */}
        <div className="sm:hidden">
          <div className="h-4 w-full bg-[#383838] rounded mb-2" />
          <div className="h-4 w-3/4 bg-[#383838] rounded" />
        </div>

        {/* Full Description (desktop) */}
        <div className="hidden space-y-2 sm:block h-[200px]">
          <div className="h-4 w-full bg-[#383838] rounded" />
          <div className="h-4 w-full bg-[#383838] rounded" />
          <div className="h-4 w-full bg-[#383838] rounded" />
          <div className="h-4 w-full bg-[#383838] rounded" />
          <div className="h-4 w-full bg-[#383838] rounded" />
          <div className="h-4 w-full bg-[#383838] rounded" />
          <div className="h-4 w-full bg-[#383838] rounded" />
          <div className="h-4 w-full bg-[#383838] rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProphytesSkeleton;
