import LeftAngleSvg from "@/public/img/icon/LeftAngleSvg";
import Link from "next/link";
import React from "react";

const ClaimButton = ({ title, isBorder = true }) => {
  return (
    <Link
      href="/onboard"
      className={`relative group flex  overflow-hidden  items-center  xs:h-[60px] h-[54px]   bg-white text-black rounded-[99px] w-fit
                       transition-all duration-500 ease-in border ${
                         isBorder ? "border-white " : "border-black"
                       } cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto `}
    >
      <span
        className={`font-inter relative  ml-[5px]   px-3 text-base  text-black font-bold   leading-5 rounded-[99px] transition-all duration-500 ease-in `}
      >
        <span className="relative z-[99] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
          {title}
        </span>
      </span>
      <span className="pr-3 xs:pr-5 relative z-[99]">
        <LeftAngleSvg className="text-black transition-all duration-300 ease-out group-hover:text-white" />
      </span>
    </Link>
  );
};

export default ClaimButton;
