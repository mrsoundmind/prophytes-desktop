import React from "react";

const InputFieldSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="lg:h-6 md:h-5 h-4 w-32 bg-gray-300 rounded mb-3" />

      <div className="w-full h-[52px] bg-gray-300 rounded-[10px]" />
    </div>
  );
};

export default InputFieldSkeleton;
