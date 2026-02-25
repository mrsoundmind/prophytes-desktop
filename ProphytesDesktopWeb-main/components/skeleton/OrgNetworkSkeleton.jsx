import React from "react";

const OrgNetworkSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between mb-4 animate-pulse"
        >
          <div className="flex items-center space-x-3">
            <div className="h-[56px] w-[56px] rounded-full bg-gray-300"></div>
            <div className="space-y-2">
              <div className="w-40 h-4 bg-gray-300 rounded"></div>
              <div className="flex items-center gap-[10px]">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrgNetworkSkeleton;
