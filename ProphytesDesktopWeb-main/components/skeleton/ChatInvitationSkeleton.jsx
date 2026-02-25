"use client";

const ChatInvitationSkeleton = () => {
  return (
    <div className="lg:p-8 p-5 bg-[#E6E6E6] rounded-[10px] shadow-lg w-fit block m-auto animate-pulse">
      <div>
        {/* Avatar Skeleton */}
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
        </div>

        <div className="space-y-2 sm:space-y-5">
          {/* Name Skeleton */}
          <div className="flex items-center justify-center gap-1 mt-1">
            <div className="w-40 h-6 bg-gray-300 rounded sm:h-7 sm:w-52" />
          </div>

          <div className="space-y-2 sm:space-y-5">
            {/* Description Skeleton */}
            <div className="space-y-2 text-center">
              <div className="h-4 mx-auto bg-gray-300 rounded w-60" />
              <div className="h-4 mx-auto bg-gray-300 rounded w-52" />
              <div className="w-40 h-4 mx-auto bg-gray-300 rounded" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex items-center justify-center gap-5 mt-3">
              <div className="w-24 h-10 bg-gray-300 rounded-full sm:h-12 sm:w-28" />
              <div className="w-24 h-10 bg-gray-300 rounded-full sm:h-12 sm:w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInvitationSkeleton;
