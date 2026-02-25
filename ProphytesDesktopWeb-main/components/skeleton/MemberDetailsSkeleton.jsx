"use client";
import React from "react";

const MemberDetailsSkeleton = () => {
  return (
    <section className="relative animate-pulse">
      <div className="w-full bg-black">
        {/* Cover Image Skeleton */}
        <div className="relative w-screen -mx-[calc((100vw-98%)/2)] overflow-x-hidden">
          <div className="w-full lg:h-[524px] md:h-[320px] sm:h-[300px] xs:h-[200px] h-[150px] bg-gray-700/40" />
        </div>

        <div className="container relative">
          {/* Profile Avatar Skeleton */}
          <div className="relative sm:-mt-16 -mt-14">
            <div className="relative border-[6px] border-white/20 rounded-full sm:h-[150px] h-[120px] sm:w-[150px] w-[120px] bg-gray-600" />
          </div>

          {/* Member Info Skeleton */}
          <div className="flex justify-between">
            <div className="flex flex-col gap-2 mt-6">
              <div className="w-40 h-6 bg-gray-700 rounded-full sm:w-52" />
              <div className="h-4 bg-gray-700 rounded-full sm:w-40 w-28" />
            </div>

            {/* Links / Actions Skeleton */}
            <div className="flex justify-center gap-3 mt-5">
              <div className="w-24 h-8 bg-gray-700 rounded-full sm:w-36 sm:h-10" />
              <div className="w-24 h-8 bg-gray-700 rounded-full sm:w-36 sm:h-10" />
            </div>
          </div>

          {/* Card Section Skeleton */}
          <div className="bg-black rounded-[20px] mt-9 animate-pulse">
            {/* Inner Card */}
            <div className="bg-[#141615] p-4 max-w-[340px] rounded-2xl flex flex-col gap-4">
              {/* Job Info */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 p-2 rounded-full border border-[#272525] bg-gray-700" />
                <div className="h-4 w-[120px] bg-gray-700 rounded-full" />
              </div>

              {/* Location */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-[#272525] bg-gray-700" />
                <div className="h-4 w-[100px] bg-gray-700 rounded-full" />
              </div>

              {/* Chapter */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 p-2 rounded-full border border-[#272525] bg-gray-700" />
                <div className="h-4 w-[110px] bg-gray-700 rounded-full" />
              </div>

              <div className="h-[1px] bg-white/20" />

              {/* Members Count */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-700 rounded-full w-7 h-7" />
                <div className="h-4 w-[100px] bg-gray-700 rounded-full" />
              </div>

              {/* Avatars Row */}
              <div className="flex items-center mt-1">
                {Array(5)
                  .fill(null)
                  .map((_, index) => (
                    <div
                      key={index}
                      className={`w-9 h-9 border-2 border-white rounded-full bg-gray-700 overflow-hidden ${
                        index !== 0 ? "-ml-3" : ""
                      }`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberDetailsSkeleton;
