import React from "react";

const PictureSkeleton = () => {
  return (
    <div className="relative sm:h-[110px] h-20 sm:w-[110px] w-20">
      {/* Profile Image */}
      <div>
        <div className="sm:h-[110px] h-20 sm:w-[110px] w-20 rounded-full bg-gray-300" />
      </div>

      {/* Status Badge */}
      <div className="absolute right-[5px] top-0 w-[25px] h-[25px] flex items-center justify-center rounded-full border-[2px] border-gray-200 bg-green-500 z-[999]">
        {/* Status Icon */}
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>

      {/* Hover Dropdown Trigger */}
      <div className="relative inline-block group -top-7">
        <div className="h-10 w-10 bg-white grid place-content-center rounded-full cursor-pointer">
          {/* Icon placeholder */}
          <div className="w-4 h-4 bg-black" />
        </div>

        {/* Hover Dropdown Menu */}
        <div className="absolute left-0 p-6 w-[300px] bg-white shadow-lg rounded-[10px] opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-200 z-50">
          {/* View Profile Link */}
          <div className="flex items-center gap-4 py-2 cursor-pointer text-base font-bold text-black">
            {/* Icon placeholder */}
            <div className="w-5 h-5 bg-black" />
            See Profile Picture
          </div>

          {/* Upload Input */}
          <label className="flex items-center gap-4 py-2 cursor-pointer text-base font-bold text-black">
            {/* Icon placeholder */}
            <div className="w-5 h-5 bg-black" />
            Choose Profile Picture
          </label>
          <input type="file" className="hidden" />
        </div>
      </div>
    </div>
  );
};

export default PictureSkeleton;
