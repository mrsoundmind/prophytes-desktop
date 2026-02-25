import React from "react";

const ConversationSkeleton = () => {
  return (
    <div className="flex-1 my-3 ml-3 animate-pulse ">
      <div className="flex items-center justify-between">
        <div className="h-[20px] w-32 bg-gray-400 rounded"></div>
        <div className="h-[16px] w-12 bg-gray-400 rounded"></div>
      </div>

      <div className="flex items-center justify-between mt-1">
        <div className="h-[18px] w-40 bg-gray-400 rounded"></div>
        <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default ConversationSkeleton;
