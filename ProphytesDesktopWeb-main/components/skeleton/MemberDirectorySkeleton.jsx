import React from "react";

const MemberDirectorySkeleton = (item) => {
  return (
    <>
      <div className="relative flex space-x-[-40px]">
        <div className="w-[180px] flex-col rounded-[40px] p-5 text-white shadow-lg animate-pulse cursor-pointer bg-gray-200">
          {/* Avatar */}
          <div className="h-[64px] w-[64px] rounded-full bg-gray-400 mb-2 relative">
            {/* Badge */}
            <div className="w-[25px] h-[25px] absolute top-0 right-0 rounded-full border-2 border-white bg-gray-500" />
          </div>

          {/* Name */}
          <div className="w-3/4 h-5 mb-1 bg-gray-400 rounded" />

          {/* Organization */}
          <div className="w-1/2 h-4 bg-gray-400 rounded" />
        </div>
      </div>
    </>
  );
};

export default MemberDirectorySkeleton;
