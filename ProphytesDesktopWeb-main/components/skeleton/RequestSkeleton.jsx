import React from "react";
import ChatInvitationSkeleton from "./ChatInvitationSkeleton";

const RequestSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col sm:justify-between justify-start h-[calc(100vh-23vh)] xxs:h-[calc(100vh-18vh)] xss:h-[calc(100vh-20vh)] xs:h-[calc(100vh-13vh)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-190px)] lg:h-[calc(100vh-190px)] xl:h-[calc(100vh-155px)] 2xl:h-[calc(100vh-135px)] 3xl:h-[calc(100vh-135px)]">
        {/* Header Skeleton */}
        <div className="flex items-center gap-3 px-6 animate-pulse">
          <div className="relative flex items-center justify-center sm:w-[50px] xs:w-8 w-7 sm:h-[50px] xs:h-8 h-7 overflow-hidden border-2 border-white rounded-full bg-gray-400"></div>
          <div className="flex flex-col gap-1">
            <div className="w-24 h-4 bg-gray-400 rounded sm:w-32"></div>
          </div>
        </div>

        <ChatInvitationSkeleton />
      </div>
    </div>
  );
};

export default RequestSkeleton;
