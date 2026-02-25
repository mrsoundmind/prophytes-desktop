import React from "react";

import shape from "@/public/img/home/shape.png";
import Image from "next/image";

const NewsLetter = () => {
  return (
    <section>
      <div className="pt-10 pb-10 bg-black">
        <div className="container ">
          <div className="relative xs:py-[60px] py-10 lg:pl-[60px] xs:pl-[30px] pl-5 lg:pr-[50px] xs:pr-[30px] pr-5 bg-white rounded-[20px]">
            <div className="flex md:flex-row flex-col items-center lg:gap-[165px] gap-10">
              <h4 className="lg:text-[36px] sm:text-[28px] xs:text-2xl text-[16px] md:textle  text-black md:max-w-[375px] w-full font-black lg:leading-[48px] xs:leading-[38px] leading-5 font-montserrat">
                Subscribe To Our Newsletter For Updates
              </h4>
              <div
                className={`flex items-center border border-[#000000] rounded-full pl-2 pr-1 gap-1 xs:placeholder:text-[16px] placeholder:text-[14px] placeholder:text-[#333333] placeholder:font-normal placeholder:leading-5 focus:outline-none font-inter`}
              >
                <input
                  className={`flex-1 w-full xs:h-[60px] h-[43px] rounded-full rounded-r-none xs:placeholder:text-[16px] placeholder:text-[14px] placeholder:text-[#333333] placeholder:font-normal placeholder:leading-5 focus:outline-none font-inter`}
                  type="text"
                  placeholder="Enter your email"
                />
                <button
                  className={`font-inter flex-3  xs:py-[15px] py-[11px] xs:px-[34px] px-4 bg-black rounded-full xs:text-[16px] text-[13px] font-bold xs:leading-5 leading-4 text-white hover:text-black border border-black relative z-[1] overflow-hidden transition-all duration-300 ease-in-out  before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] before:bg-white before:border before:border-black before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:duration-[800ms] hover:before:-top-[96%]`}
                  type="submit"
                >
                  Submit Now
                </button>
              </div>
              <div className="absolute xl:right-[20%]   right-[20%] bottom-0">
                <Image
                  className="hidden w-full sm:block"
                  src={shape}
                  alt="shape"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
