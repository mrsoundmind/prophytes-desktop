import AngleRight from "@/public/img/icon/AngleRight";
import StartSvg from "@/public/img/icon/StartSvg";
import Image from "next/image";
import React from "react";

const BusinessCard = ({ card }) => {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#141615] p-6 shadow-lg rounded-2xl border border-white/20 group relative after:absolute after:content-[''] after:left-0 after:top-0 after:w-full after:h-0 after:z-[1] after:opacity-0 after:invisible after:transition-all after:ease-in-out after:duration-300 after:bg-[rgba(56,56,56,0.8)] hover:after:h-full hover:after:opacity-[1] hover:after:visible">
      <div className="relative">
        <Image
          src={card.image}
          alt={card.title}
          width={400}
          height={250}
          className="w-full h-[250px] rounded-[16px] object-cover"
        />
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1 mt-4 sm:mt-7">
        <h3 className="text-[28px] leading-10 font-semibold text-white font-montserrat">
          {card.title}
        </h3>

        <div className="flex items-center gap-1 mt-1 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <StartSvg key={i} />
          ))}
          <span className="text-base leading-6 text-white">
            {card.rating} ({card.reviews} Review)
          </span>
        </div>

        <div className="p-5 sm:mt-6 mt-4 text-sm text-white bg-black rounded-[16px] border border-white/30 flex-1">
          <p className="text-sm leading-[22px] text-white/70">
            {card.description}
          </p>
        </div>

        <button className="group relative inline-flex items-center m-auto xs:gap-[18px] gap-[10px] w-full h-[60px] overflow-hidden bg-white border-white rounded-[99px] transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto sm:mt-6 mt-auto">
          <span className="ml-[5px] py-3 w-full bg-black text-lg font-medium text-white leading-[26px] rounded-[99px]">
            <span className="relative z-[9] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
              Learn More
            </span>
          </span>

          <span className="pr-3 mt-2">
            <AngleRight className="text-black group-hover:text-white relative z-[9] xs:size-6 size-6 transition-all duration-500 ease-out" />
          </span>
        </button>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-[9999] bg-black/80 rounded-[5px] invisible opacity-0 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 group-hover:delay-[0.4s]">
        <h4 className="lg:text-[24px] text-[20px] sm:font-semibold font-medium lg:leading-[36px] leading-[30px] font-montserrat text-primary text-center">
          Coming Soon
        </h4>
      </div>
    </div>
  );
};

export default BusinessCard;
