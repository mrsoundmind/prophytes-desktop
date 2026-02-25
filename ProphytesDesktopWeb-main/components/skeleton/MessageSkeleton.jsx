import React from "react";

const MessageSkeleton = () => {
  return (
    <div>
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-2 pt-3 mt-10 ${
            idx % 2 === 0 ? "justify-end" : "justify-start"
          }`}
        >
          {/* Avatar (Left for Receiver) */}
          {idx % 2 !== 0 && (
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
          )}

          {/* Message Bubble */}
          <div
            className={`rounded-xl relative max-w-xs text-sm ${
              idx % 2 === 0 ? "rounded-br-none" : "rounded-bl-none"
            }`}
          >
            {/* Reply Block Skeleton */}
            {idx % 3 === 0 && (
              <div className="mb-2 px-2 py-1 border-l-4 border-gray-500 bg-gray-800 animate-pulse rounded-md w-[220px] h-5"></div>
            )}

            <div
              className={`px-4 py-2 rounded-xl ${
                idx % 2 === 0 ? "bg-gray-600" : "bg-gray-800"
              } animate-pulse`}
            >
              <div className="w-24 h-4 mb-1 bg-gray-500 rounded"></div>
              {idx % 4 === 0 && (
                <div className="w-16 h-4 bg-gray-500 rounded"></div>
              )}
            </div>

            {/* {idx % 2 === 0 && (
              <span className="absolute flex items-center gap-1 px-2 py-1 text-black bg-white rounded-full -bottom-5">
                <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-6 h-3 bg-gray-300 rounded animate-pulse"></div>
              </span>
            )} */}
          </div>

          {idx % 2 === 0 && (
            <div className="w-8 h-8 bg-gray-700 rounded-full animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
