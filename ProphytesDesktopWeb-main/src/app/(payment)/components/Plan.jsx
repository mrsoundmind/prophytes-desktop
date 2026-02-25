"use client";
import React from "react";
import Image from "next/image";
import queen from "@/public/img/queen.png";
import CheckMarkIcon from "@/src/assets/icon/CheckMarkIcon";
import { useRouter } from "next/navigation";
const Plan = ({ fn, next, title }) => {
  const router = useRouter();
  const handleNext = () => {
    if (fn) {
      fn();
    }
    if (next) {
      router.push(`/${next}`);
    }
  };

  return (
    <div className="bg-[#000000] rounded-[16px]  sm:p-6 p-4 ">
      <div className="flex items-center gap-8">
        <Image src={queen} className="" alt="queen" />
        <h4 className=" sm:text-[28px] text-xl max-w-[176px] text-white font-black lg:leading-10 xs:leading-[38px] leading-5 font-montserrat">
          Premium Membership
        </h4>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 pt-1 sm:pt-4">
        <p className="w-[253px] text-white/70 sm:text-base text-sm sm:leading-6 leading-[22px]">
          For verified alumni who want full access to every verified member in
          the Divine Nine.
        </p>
        <h4 className="sm:text-[28px] text-xl sm:font-semibold font-medium text-white sm:leading-10 leading-[30px]">
          $100/year
        </h4>
      </div>
      <div className="w-full m-auto ">
        <div className="block w-full  mt-5 bg-[#141616] sm:px-6 px-4 border border-[#383838] rounded-[16px]">
          <ul>
            <li className="flex items-center gap-4 text-base leading-6 text-white py-[15px] border-b border-[#000000]">
              <span>
                <CheckMarkIcon className="text-white " />
              </span>{" "}
              Direct messaging across all orgs
            </li>
            <li className="flex items-center gap-4 text-base leading-6 text-white py-[15px] border-b border-[#000000]">
              <span>
                <CheckMarkIcon className="text-white " />
              </span>
              Premium badge + enhanced profile
            </li>
            <li className="flex items-center gap-4 text-base leading-6 text-white py-[15px] border-b border-[#000000]">
              <span>
                {" "}
                <CheckMarkIcon className="text-white " />
              </span>{" "}
              Shareable digital business card link
            </li>
            <li className="flex items-center gap-4 text-base leading-6 text-white py-[15px] border-b border-[#000000]">
              <span>
                {" "}
                <CheckMarkIcon className="text-white " />
              </span>{" "}
              Priority visibility in the directory
            </li>
            <li className="flex items-center gap-4 text-base leading-6 text-white py-[15px]">
              <span>
                {" "}
                <CheckMarkIcon className="text-white " />
              </span>{" "}
              Invitations to Premium only events
            </li>
          </ul>
        </div>
        <button
          className="w-full py-4 mt-5 text-base font-medium leading-5 bg-white rounded-full"
          onClick={handleNext}
        >
          {title}
        </button>
      </div>
    </div>
  );
};

export default Plan;
