"use client";
import React from "react";

const PremiumMemberProfileSkeleton = () => {
  return (
    <section className="relative animate-pulse">
      <div className="bg-black pb-[150px]">
        {/* Cover Image Skeleton */}
        <div className="relative block xs:hidden">
          <div className="bg-gray-700 w-full h-[150px] sm:h-[300px] md:h-[320px] lg:h-[400px] rounded-lg"></div>
        </div>
        <div className="container relative">
          <div className="relative hidden xs:block">
            <div className="bg-gray-700 w-full h-[150px] sm:h-[300px] md:h-[320px] lg:h-[400px] rounded-lg"></div>
          </div>

          {/* Profile Image Skeleton */}
          <div className="absolute -mt-14 sm:-mt-16 left-[44%]">
            <div className="bg-gray-500 rounded-full w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] xs:w-[120px] xs:h-[120px] shadow-lg ring-8 ring-white"></div>
          </div>

          {/* Member Details Skeleton */}
          <div className="bg-gray-800 rounded-[20px] sm:p-[50px] p-5 mt-4">
            <div className="flex flex-col gap-3 mb-5 xs:flex-row xs:items-center">
              <div className="w-40 h-8 bg-gray-600 rounded-md sm:h-10 xs:h-9 sm:w-60"></div>
              <div className="hidden w-24 h-6 bg-gray-600 rounded-md xs:block"></div>
            </div>

            {/* Member Specifications Skeleton */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                <div className="w-40 h-5 bg-gray-600 rounded-md"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                <div className="w-40 h-5 bg-gray-600 rounded-md"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                <div className="w-40 h-5 bg-gray-600 rounded-md"></div>
              </div>
            </div>

            {/* Connections / Buttons Skeleton */}
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <div className="w-32 h-8 bg-gray-600 rounded-md"></div>
              <div className="w-32 h-8 bg-gray-600 rounded-md"></div>
              <div className="w-32 h-8 bg-gray-600 rounded-md"></div>
            </div>

            {/* Social Icons Skeleton */}
            <div className="flex items-center gap-3 mt-5">
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
            </div>
          </div>

          {/* Premium Profile Skeleton */}
          <div className="mt-5 bg-gray-700 h-60 rounded-[20px] sm:block hidden"></div>
        </div>
      </div>
    </section>
  );
};

export default PremiumMemberProfileSkeleton;
