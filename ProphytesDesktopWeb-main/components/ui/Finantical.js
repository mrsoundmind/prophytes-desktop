import Image from "next/image";
import React from "react";

import couple from "@/public/img/home/couple.png";
import line from "@/public/img/home/line.png";
import security01 from "@/public/img/icon/security1.svg";
import empower from "@/public/img/icon/empower.svg";
import handshake from "@/public/img/icon/handshake.svg";

const Finantical = () => {
  return (
    <section className="lg:py-[123px] md:py-[110px] py-20 bg-black">
      <div className="container">
        <div className="grid md:grid-cols-[47%_50%] lg:grid-cols-[40%_55%] gap-0 sm:gap-6 lg:gap-[40px] items-center">
          <div className="">
            <div className="relative mb-5 sm:mb-0">
              <div className="absolute -left-5 sm:top-[-96px] -top-10 md:left-[-80px] ">
                <Image className="sm:size-auto size-20" src={line} alt="line" />
              </div>
              <div className="block rounded-[20px]">
                <Image className="w-full" src={couple} alt="couple" />
                <div className="bg-[#141616] sm:-mt-[100px] -mt-[95px] z-[9] relative w-full py-[29px] md:px-10 px-6 rounded-[20px]">
                  <h4 className="text-xl md:text-[28px] font-semibold md:leading-10 leading-[30px] max-w-[407px] font-montserrat text-white mx-auto md:text-center ">
                    Pledge: “1 Million Financial D9 Members by 2030”
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="2xl:p-8 sm:p-8 p-5 bg-[#141616] rounded-[20px] border border-[#383838]">
              <h2 className="mb-6 text-white sm:mb-4 font-montserrat">
                By Prophytes
                <br />
                For Prophytes
              </h2>
              <p className="font-inter text-sm  font-normal  leading-[22px] text-white/70 mb-4">
                We’ve always had the power. Now we have the platform.
              </p>

              <div className="flex flex-col sm:gap-6 gap-[10px] mb-7 sm:flex-row 2xl:mb-11 lg:mb-6 sm:mb-8">
                <div>
                  <div className="grid place-content-center lg:size-[96px] sm:size-[80px] size-[54px] bg-black rounded-full border border-[#383838]">
                    <Image
                      className="sm:size-full size-6"
                      src={security01}
                      alt="verified"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="lg:text-[24px] text-[20px]  text-white sm:font-semibold font-medium lg:leading-[36px] leading-[30px] font-montserrat">
                    Verified Network
                  </h4>
                  <p
                    className={`font-inter text-sm  font-normal  leading-[22px] text-white/70 mt-2  `}
                  >
                    A secure, D9-only ecosystem where your identity is protected
                    and your membership is validated. No bots. No noise. Just
                    real members, verified , so every connection counts.
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:gap-6 gap-[10px] mb-7 sm:flex-row 2xl:mb-11 lg:mb-6 sm:mb-8">
                <div>
                  <div className="grid place-content-center lg:size-[96px] sm:size-[80px] size-[54px] bg-black rounded-full border border-[#383838]">
                    <Image
                      className="sm:size-full size-6"
                      src={empower}
                      alt="verified"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="lg:text-[24px] text-[20px]  text-white sm:font-semibold font-medium lg:leading-[36px] leading-[30px] font-montserrat">
                    Economic Empowerment
                  </h4>
                  <p
                    className={`font-inter text-sm  font-normal  leading-[22px] text-white/70 mt-2  `}
                  >
                    From peer lending and payments to group economics and shared
                    investments , this network is built to grow wealth and keep
                    it circulating where it belongs: with us.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:gap-6 gap-[10px]  sm:flex-row  ">
                <div>
                  <div className="grid place-content-center lg:size-[96px] sm:size-[80px] size-[54px] bg-black rounded-full border border-[#383838]">
                    <Image
                      className="sm:size-full size-6"
                      src={handshake}
                      alt="verified"
                    />
                  </div>
                </div>
                <div>
                  <h4 className="lg:text-[24px] text-[20px]  text-white sm:font-semibold font-medium lg:leading-[36px] leading-[30px] font-montserrat">
                    Community First
                  </h4>
                  <p
                    className={`font-inter text-sm  font-normal  leading-[22px] text-white/70 mt-2  `}
                  >
                    This isn’t just a directory , it’s a movement. Organize,
                    fund, and build legacy together as a unified network rooted
                    in service, culture, and collaboration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Finantical;
