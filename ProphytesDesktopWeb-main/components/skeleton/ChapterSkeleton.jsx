import React from "react";

const ChapterSkeleton = () => {
  return (
    <div className="group relative p-8 rounded-[20px] bg-[#141616] min-h-[350px] duration-300 mt-5">
      {/* Logo Skeleton */}
      <div className="flex items-center justify-center">
        <div className="w-20 h-20 bg-gray-700 rounded-full animate-pulse" />
      </div>

      <div>
        {/* Chapter Name Skeleton */}
        <h4 className="w-40 h-4 mx-auto mt-4 mb-4 bg-gray-700 rounded animate-pulse"></h4>

        {/* List Skeleton */}
        <ul className="space-y-[14px] bg-black border border-[#383838] rounded-2xl p-5">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <li
                key={i}
                className="flex gap-[12px] items-center text-sm leading-[22px]"
              >
                <span className="border-[#383838] border-[1px] h-8 w-8 rounded-full bg-gray-700 animate-pulse inline-flex items-center justify-center" />
                <span className="w-32 h-4 bg-gray-700 rounded animate-pulse"></span>
              </li>
            ))}
        </ul>

        {/* Contact Button Skeleton */}
        <div className="mt-5">
          <div className="w-full h-12 bg-gray-700 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ChapterSkeleton;
