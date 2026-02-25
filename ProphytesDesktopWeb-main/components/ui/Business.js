"use client";
import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import { cards } from "@/src/app/Business";
import BusinessCard from "./BusinessCard";

import AngleRight from "@/public/img/icon/AngleRight";
import MobileSearchSvg from "@/public/img/icon/MobileSearchSvg";

const Business = () => {
  const [selectedChapter, setSelectedChapter] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const handleSearch = () => {};

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 640);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <section className="bg-black  md:py-[140px] xs:py-20  py-[60px]">
      <div className="container">
        <h2 className="text-left text-white sm:text-center font-montserrat">
          Prophytes Business
        </h2>
        <div className="sm:p-5 sm:bg-[#141616] xl:rounded-[60px] rounded-[30px] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2  sm:gap-3 gap-[10px] items-center mt-6">
          {/* Business Name Input */}
          <input
            className="appearance-none bg-white/10 text-white/70 focus:outline-none w-full border border-white/10 sm:h-[60px] h-[50px]  pl-5 rounded-full text-base font-normal sm:leading-[22px] leading-5 placeholder:text-white placeholder:text-base placeholder:text-white/70 cursor-not-allowed"
            type="text"
            disabled
            onChange={(e) => setSelectedChapter(e.target.value)}
            value={selectedChapter}
            placeholder="Business Name"
          />

          {/* Business Category */}
          <CustomSelect
            optionKey="name"
            optionLabel="name"
            placeholder="Business Category"
            changeBg
            onSearchChange={(searchTerm) =>
              setSchoolFilter("search", searchTerm)
            }
            isWorking={false}
          />

          {/* Location */}
          <CustomSelect
            optionKey="name"
            optionLabel="name"
            placeholder="Location"
            onSearchChange={(searchTerm) =>
              setCitesFilter("search", searchTerm)
            }
            changeBg
            isWorking={false}
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="group sm:h-[60px] h-[50px] w-full bg-white/10 cursor-not-allowed rounded-full text-[14px] font-semibold leading-[28px] text-white   col-span-1 sm:col-span-1"
          >
            <span className="text-white/70">
              <span className="flex items-center justify-center gap-[10px]">
                <MobileSearchSvg className="block text-white sm:hidden" />
                Search
              </span>
            </span>
          </button>
        </div>

        <div className="grid gap-3 mt-6 sm:mt-10 sm:gap-6 lg:grid-cols-3 md:grid-cols-2">
          {cards.map((card, index) => (
            <BusinessCard card={card} key={index} />
          ))}
        </div>

        <div className="block m-auto mt-6 text-center sm:mt-14">
          <button
            // onClick={handleSeeMore}
            className="group relative inline-flex m-auto xs:gap-[18px] gap-[10px] items-center  h-[66px] overflow-hidden  bg-white border-white rounded-[99px]   transition-all duration-500 ease-in after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto cursor-not-allowed "
          >
            <span className="ml-[5px]  py-[14px]  px-5   bg-black text-lg   font-medium  text-white leading-[26px] rounded-[99px]">
              <span className="relative z-[9] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                See More
              </span>
            </span>

            <span className="pr-3 mt-3">
              <AngleRight className="text-black group-hover:text-white relative z-[9] xs:size-6 size-6 transition-all duration-500 ease-out" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Business;
