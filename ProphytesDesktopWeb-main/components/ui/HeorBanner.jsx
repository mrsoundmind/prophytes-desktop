"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useGetMembersDirectoryQuery } from "@/src/redux/services/memberApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";

import left from "@/public/img/home/bg-left.png";
import right from "@/public/img/home/bg-right.png";
import AngleRight from "@/public/img/icon/AngleRight";
import DirectorySvg from "@/public/img/icon/DirectorySvg";
import HeroSlider from "./HeroSlider";
import shadow from "@/public/img/home/shadow.png";
import shadowright from "@/public/img/home/shadow-right.png";

export default function HeroSection() {
  const { data: membersDirectory, isLoading } = useGetMembersDirectoryQuery();
  const { data: userInfo, isLoading: loading } = useUserInfoQuery();
  const route = useRouter();
  const [visibleCards, setVisibleCards] = useState(0);

  // Inside your component
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setShouldAnimate(true);

    // Store in sessionStorage to prevent re-animation on re-renders
    const hasAnimated = sessionStorage.getItem("hasAnimated");
    if (!hasAnimated) {
      setShouldAnimate(true);
      sessionStorage.setItem("hasAnimated", "true");
    }
  }, []);

  useEffect(() => {
    if (!membersDirectory?.data) return;
    membersDirectory.data.forEach((_, i) => {
      setTimeout(() => setVisibleCards((prev) => prev + 1), i * 200); // 200ms gap
    });
  }, [membersDirectory?.data]);

  const handleClick = (id) => {
    route.push(`/members/${id}`);
  };

  const handleScroll = () => {
    const section = document.getElementById("section2");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className=" overflow-hidden bg-[#000000] ">
      <div className="relative w-full mx-auto overflow-hidden">
        <div className=" mx-auto xl:h-[1050px] md:h-[840px] sm:h-[900px] h-[680px]">
          <div className="absolute left-0 z-0 hidden top-20 lg:block">
            <Image
              src={right}
              alt="Left background"
              className=" h-[700px] 2xl:w-[720px] w-auto"
            />
          </div>

          <div className="absolute left-0 lg:block hidden -top-[10%] rotate-[0deg]">
            <Image src={shadow} alt="shadow" />
          </div>

          <div className="absolute right-0 z-0 hidden top-20 lg:block">
            <Image
              src={left}
              alt="Right background"
              className=" 2xl:h-[800px] h-[700px] 2xl:w-[700px] w-auto"
            />
          </div>
          <div className="absolute right-0 hidden lg:block -top-20">
            <Image
              src={shadowright}
              alt="shadow right"
              // style={{
              //   animation: "spin 12s linear infinite",
              //   transformOrigin: "center right",
              //   display: "block",
              // }}
            />
          </div>

          <div className="container ">
            <div className="relative flex flex-col items-center text-center">
              <div
                className=" w-full 2xl:pt-[56px] pt-8  
"
              >
                <div className="block mx-auto max-w-[740px] sm:px-8 px-0">
                  <h1 className="2xl:text-[70px] sm:text-[60px] text-[35px] 2xl:leading-[80px] sm:leading-[72px] leading-[48px] font-bold text-white font-montserrat">
                    Come Back Home.
                  </h1>

                  <h4 className="sm:text-xl text-sm sm:leading-[34px] leading-5 sm:mt-6 mt-4 font-medium text-[#B2B2B2] font-inter">
                    Prophytes helps D9 members reclaim their place, verify your
                    letters, claim your Prophytes #, and reconnect with your
                    chapter so staying active & financial is simple.
                  </h4>
                </div>

                <div
                  className={`${
                    userInfo?.user ? "mt-6 md:mt-9" : "mt-6 md:mt-9"
                  }`}
                >
                  {!userInfo?.user && !loading && (
                    <Link
                      href="/onboard"
                      className="group  relative xl:inline-flex hidden m-auto xs:gap-[10px] gap-[10px] items-center w-[282px]  h-[66px]  overflow-hidden  bg-white border-white rounded-[99px]    transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto"
                    >
                      <span className="w-[228px] py-[14px] ml-[5px]   bg-black text-lg   font-medium  text-white leading-[26px]   rounded-[99px]">
                        <span className="relative z-[9] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                          Claim My Prophytes #
                        </span>
                      </span>

                      <span className="pr-3 mt-3">
                        <AngleRight className="text-black group-hover:text-white relative z-[99] xs:size-6 size-6 transition-all duration-500 ease-out" />
                      </span>
                    </Link>
                  )}

                  <button
                    onClick={handleScroll}
                    className={`group ml-5  w-[236px] relative inline-flex m-auto xs:gap-[10px] gap-[10px] items-center border border-white/10 h-[66px] overflow-hidden bg-black rounded-[99px] p-[2px] transition-all duration-700 ease-in cursor-pointer
    after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-white
    xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms]
    after:border-0 group-hover:after:border-white
    after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto ${
      userInfo?.user ? "" : "sm:mt-5 mt-0"
    }`}
                  >
                    <span className="w-[182px] py-[14px] ml-[5px] bg-[#141616]  sm:text-lg text-base font-normal text-white   sm:leading-[26px] leading-6 rounded-[99px]">
                      <span className="relative z-[9]   group-hover:text-black group-hover:transition-all group-hover:duration-500 ease-in">
                        See my chapter
                      </span>
                    </span>

                    <span className="pr-3 mt-2">
                      <AngleRight className="text-white group-hover:text-black relative z-[99] xs:size-6 size-6 transition-all duration-500 ease-out" />
                    </span>
                  </button>
                </div>

                <div
                  className={`max-w-[712px] mx-auto mt-10  ${
                    userInfo?.user ? "mb-[40px]" : "mb-[40px]"
                  }`}
                >
                  <div
                    className="hidden sm:flex items-center justify-center text-[#B2B2B2]
    bg-[linear-gradient(90deg,rgba(20,22,22,0.35)_0%,#141616_50%,rgba(20,22,22,0)_100%)]
    py-5 px-5 rounded-full text-base  font-montserrat font-medium leading-7"
                  >
                    Verified D9 members • Private by design • Chapters
                    nationwide
                  </div>

                  <div
                    className="sm:hidden overflow-hidden rounded-full pl-4
    bg-[linear-gradient(90deg,rgba(20,22,22,0.35)_0%,#141616_50%,rgba(20,22,22,0)_100%)]
    py-5"
                  >
                    <div className="marquee text-[#B2B2B2] text-sm font-montserrat font-normal leading-5">
                      <div className="marquee-track">
                        <span>
                          Verified D9 members • Private by design • Chapters
                          nationwide
                          <span className="mx-2">•</span>
                        </span>
                        <span>
                          Verified D9 members • Private by design • Chapters
                          nationwide
                          <span className="mx-2">•</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Curved Cards */}
              <div className="absolute xl:block hidden -bottom-[52%] overflow-visible h-[400px]">
                {isLoading
                  ? Array.from({ length: 9 }).map((_, index) => {
                      const positions = [
                        { x: 0, y: 0 },
                        { x: 140, y: 100 },
                        { x: 280, y: 180 },
                        { x: 420, y: 250 },
                        { x: 560, y: 320 },
                        { x: 720, y: 250 },
                        { x: 840, y: 180 },
                        { x: 980, y: 100 },
                        { x: 1120, y: 0 },
                      ];

                      const totalWidth = 1100;
                      const cardWidth = 200;
                      const { x, y } = positions[index] || { x: 0, y: 0 };

                      return (
                        <div
                          key={index}
                          className="absolute 2xl:w-[200px] w-[180px] h-[166px] flex-col rounded-[40px] p-5 animate-pulse bg-gray-700"
                          style={{
                            left: "50%",
                            transform: `translate(${
                              x - totalWidth / 2 - cardWidth / 2
                            }px, ${y}px)`,
                          }}
                        >
                          <div className="h-[64px] w-[64px] rounded-full bg-gray-500 mb-3" />
                          <div className="w-3/4 h-5 mb-1 bg-gray-500 rounded" />
                          <div className="w-1/2 h-4 bg-gray-500 rounded" />
                        </div>
                      );
                    })
                  : membersDirectory?.data?.map((item, index) => {
                      const positions = [
                        { x: 0, y: 0 },
                        { x: 140, y: 100 },
                        { x: 280, y: 180 },
                        { x: 420, y: 250 },
                        { x: 560, y: 320 },
                        { x: 720, y: 250 },
                        { x: 840, y: 180 },
                        { x: 980, y: 100 },
                        { x: 1120, y: 0 },
                      ];

                      const totalWidth = 1100;
                      const cardWidth = 200;
                      const { x, y } = positions[index] || { x: 0, y: 0 };
                      const translateX = x - totalWidth / 2 - cardWidth / 2;
                      const translateY = y;

                      return (
                        <div
                          key={index}
                          onClick={() => handleClick(item?.id)}
                          className="
      member-card absolute
      2xl:w-[200px] xl:w-[180px] xl:block hidden
      h-[166px] flex-col rounded-[40px] p-5 text-white 
      transform-gpu transition-transform duration-500 ease-in-out
      hover:scale-110  hover:z-20 cursor-pointer shadow-[-12px_16px_32px_0px_#00000080]
      translate-x-[var(--tw-translate-x)] translate-y-[var(--tw-translate-y)]
    "
                          style={{
                            "--tw-translate-x": `${translateX}px`,
                            "--tw-translate-y": `${translateY}px`,
                            animationDelay: `${index * 0.1}s`,
                            backgroundColor:
                              item.organization?.name === "Alpha Phi Alpha"
                                ? `#CFB53B`
                                : `#${item.organization.color}`,
                          }}
                        >
                          <div className="h-[68px] w-[68px] relative">
                            <Image
                              src={item.avatar}
                              alt={item.firstName}
                              width={64}
                              height={64}
                              className="w-full h-full border-4 rounded-full border-white/20"
                            />
                            <div
                              className="w-[25px] h-[25px] absolute top-0 right-0 flex items-center justify-center rounded-full"
                              style={{
                                backgroundColor: item?.isPaid
                                  ? `#${item?.organization?.color}`
                                  : "#16AD4B",
                              }}
                            >
                              <DirectorySvg />
                            </div>
                          </div>
                          <p className="mt-2 text-lg font-medium leading-7 text-left text-white line-clamp-1">
                            {item.firstName}
                          </p>
                          <p className="mt-1 text-[12px] text-left leading-[18px] text-white">
                            {item?.organization?.name}
                          </p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className="xl:mt-0 sm:mt-[40px] mt-10">
            <HeroSlider
              data={membersDirectory}
              anim="marque-left"
              loading={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
