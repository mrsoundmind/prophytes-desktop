import React from "react";
import MessageSkeleton from "./MessageSkeleton";

const ChattingSkeleton = () => {
  return (
    <div className="p-4 mt-4 mb-2 sm:mt-0 sm:mb-0">
      <div
        className={`flex flex-col sm:justify-between justify-start overflow-hidden overflow-x-hidden  h-[calc(100vh-35vh)] xxs:h-[calc(100vh-21vh)] xss:h-[calc(100vh-18vh)] xs:h-[calc(100vh-16vh)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-190px)] lg:h-[calc(100vh-190px)] xl:h-[calc(100vh-130px)] 2xl:h-[calc(100vh-130px)] 3xl:h-[calc(100vh-133px)]"
            
        `}
      >
        {/* Skeleton Header */}
        <div className="flex items-center gap-3">
          {/* Avatar skeleton */}
          <div>
            <div className="relative flex items-center justify-center sm:w-[50px] xs:w-8 w-7 sm:h-[50px] xs:h-8 h-7 overflow-hidden border-2 border-white rounded-full">
              <div className="w-full h-full bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Name skeleton */}
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded-md w-28 sm:w-40 animate-pulse"></div>
          </div>
        </div>

        {/* Skeleton Messages */}
        <MessageSkeleton />

        {/* Skeleton Chat Input */}
        <div className="flex items-center gap-2">
          <div>
            {/* Fake label skeleton (instead of LinkSvg) */}
            <div className="w-6 h-6 bg-gray-700 rounded-md animate-pulse"></div>

            {/* Keep input hidden so structure is same */}
            <input
              id="fileUpload"
              type="file"
              accept="video/*,.pdf,.doc,.docx"
              className="hidden"
              disabled
            />
          </div>

          {/* Fake button skeleton (instead of AngleLeft) */}
          <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse"></div>
        </div>

        <div className="block mt-3 sm:hidden">
          <div className="w-full h-12 bg-gray-700 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default ChattingSkeleton;
