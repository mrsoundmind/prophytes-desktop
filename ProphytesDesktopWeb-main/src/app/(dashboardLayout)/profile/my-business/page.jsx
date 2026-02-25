import React from "react";
import { cards } from "@/src/app/Business";
import ShareProfile from "../../components/ShareProfile";
import BusinessPlusSvg from "@/public/img/icon/BusinessPlusSvg";
import BusinessCard from "@/components/ui/BusinessCard";

const MyBusiness = () => {
  return (
    <div>
      <div className="relative flex flex-wrap items-center justify-between gap-6 sm:gap-4">
        <div className="flex flex-wrap items-center sm:gap-[10px] gap-5 sm:mt-0 mt-8">
          <h3 className="xl:text-[36px] text-2xl text-white  font-semibold lg:leading-[48px] leading-9  font-montserrat">
            Listed Businesses
          </h3>
          <button
            className="items-center justify-center hidden h-10 gap-2 px-4 bg-white rounded-full cursor-not-allowed sm:flex"
            disabled
            //   onClick={() => setOpen(true)}
          >
            <BusinessPlusSvg /> <span className="text-black">Add Business</span>
          </button>
        </div>
        <div className="flex items-center justify-between flex-1 sm:flex-none">
          <button
            className="flex items-center justify-center h-10 gap-2 px-2 text-black bg-white rounded-full xss:px-4 sm:hidden"
            //   onClick={() => setOpen(true)}
          >
            <BusinessPlusSvg /> <span className="text-black">Add Business</span>
          </button>
          <ShareProfile />
        </div>
      </div>
      <div className="grid gap-3 mt-6 sm:mt-10 sm:gap-6 xl:grid-cols-2">
        {cards.slice(0, 2).map((card, index) => (
          <BusinessCard card={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default MyBusiness;
