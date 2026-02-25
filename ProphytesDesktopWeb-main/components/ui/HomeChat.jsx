import React from "react";
import chat from "@/public/img/home/p2pchat.png";
import Image from "next/image";
import AngleRight from "@/public/img/icon/AngleRight";
import Link from "next/link";

const HomeChat = () => {
  return (
    <div className="lg:pt-[95px] sm:pt-20 sm:pb-20 sm:bg-[#141616] bg-black">
      <h2 className="pb-6 text-center text-white sm:pb-10 font-montserrat">
        Prophytes Chat
      </h2>
      <div className="container">
        <div className="w-full h-auto shadow-lg">
          <Image className="w-full h-auto" src={chat} alt="chat" />
        </div>
        <div className="flex items-center mt-6 sm:mt-10 ">
          <Link
            href="/chat"
            className="group relative inline-flex m-auto xs:gap-[18px] gap-[10px] items-center  h-[66px] overflow-hidden  bg-white border-white rounded-[99px]   transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto  "
          >
            <span className="ml-[5px]  py-[14px]   px-5   bg-black  text-lg  font-medium  text-white leading-[26px]   rounded-[99px]">
              <span className="relative z-[9]  group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                Go to Chatbox
              </span>
            </span>

            <span className="pr-3 mt-3">
              <AngleRight className="text-black group-hover:text-white relative z-[9] xs:size-6 size-6 transition-all duration-500 ease-out" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeChat;
