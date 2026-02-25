"use client";
import React from "react";

export default function ProfileSkeleton() {
  const navSkeleton = Array(4).fill(null); // for menu items

  return (
    <div className="bg-black">
      <div className="container">
        <div className="grid md:grid-cols-[50%_50%] 3xl:grid-cols-[24.5%_73%] lg:grid-cols-[36%_61%] 2xl:gap-12 gap-8">
          {/* ===== Sidebar Skeleton ===== */}
          <aside className="">
            <div className="bg-[#141615] sm:py-10 sm:px-10 py-8 px-5 rounded-[20px] relative md:-mt-[30%] -mt-[15%] z-[999] animate-pulse">
              {/* === Profile Section === */}
              <div className="flex flex-col items-center">
                {/* Avatar */}
                <div className="relative h-[140px] w-[140px] rounded-full border-[6px] border-[#282828] overflow-hidden bg-[#1e1e1e]" />
                {/* Badge */}
                <div className="absolute mt-[120px] bg-[#2d2d2d] text-transparent px-[14px] py-2 rounded-full flex items-center gap-1 w-[120px] h-[32px]" />
              </div>

              {/* Username */}
              <div className="flex flex-col items-center gap-3 mt-10">
                <div className="h-6 w-32 bg-[#2d2d2d] rounded-md" />
                <div className="h-6 w-16 bg-[#2d2d2d] rounded-md" />
              </div>

              {/* === Navigation Skeleton === */}
              <nav className="border border-[#383838] rounded-[16px] overflow-hidden mt-8">
                {navSkeleton.map((_, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-center text-base leading-6 sm:py-5 py-4 px-5 border-b border-[#383838] last:border-none"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2d2d2d]" />
                    <div className="flex-1 h-4 bg-[#2d2d2d] rounded-md" />
                  </div>
                ))}
              </nav>

              {/* === Business Section === */}
              <div className="flex items-center justify-between rounded-[16px] py-4 px-5 border border-[#383838] mt-4 bg-[#141616]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2d2d2d]" />
                  <div className="h-4 w-24 bg-[#2d2d2d] rounded-md" />
                </div>
                <div className="w-6 h-6 bg-[#2d2d2d] rounded-full" />
              </div>

              {/* === Member Since === */}
              <div className="mt-4 h-4 w-36 bg-[#2d2d2d] rounded-md" />
            </div>
          </aside>

          {/* ===== Main Content Skeleton ===== */}
          <main className="sm:mt-5 md:mt-[60px] mt-0">
            <div className="animate-pulse">
              {/* === Header Section === */}
              <div className="relative flex flex-wrap items-center justify-between gap-4 mt-8 sm:mt-0">
                <div className="flex items-center flex-1 sm:flex-none justify-between gap-[10px]">
                  <div className="h-[36px] w-[160px] bg-[#2d2d2d] rounded-md" />
                  <div className="flex items-center gap-2 h-10 px-4 rounded-full bg-[#2d2d2d] w-[100px]" />
                </div>
                <div className="h-[36px] w-[120px] bg-[#2d2d2d] rounded-md" />
              </div>

              {/* === Content Section === */}
              <div className="grid lg:grid-cols-2 lg:gap-[30px] p-10 bg-[#141615] border border-[#383838] rounded-[16px] shadow-lg mt-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i}>
                      <div className="h-4 w-40 bg-[#2d2d2d] rounded-md mb-2" />
                      <div className="h-5 w-64 bg-[#2d2d2d] rounded-md" />
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="mt-6 space-y-6 lg:mt-0">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="h-4 w-40 bg-[#2d2d2d] rounded-md mb-2" />
                      <div className="h-5 w-64 bg-[#2d2d2d] rounded-md" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
