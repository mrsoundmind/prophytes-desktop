"use client";

import { orgLogos } from "@/src/configs/constants";
import Image from "next/image";
import React, { useState } from "react";

const PropytesContent = ({ prophyte, sortCode }) => {
  const [showPopup, setShowPopup] = useState(false);
  const maxLength = 145;
  const isLongDescription = prophyte.description.length > maxLength;

  // Shortened version for mobile
  const truncatedDescription = isLongDescription
    ? prophyte.description.slice(0, maxLength)
    : prophyte.description;

  const bottomColor = "rgba(106, 56, 212, 0)";

  return (
    <div className=" bg-black border border-[#383838] rounded-[20px] sm:p-9 p-4 overflow-hidden  h-full flex flex-col ">
      <div
        className="grid items-start grid-cols-1 gap-4 p-4 sm:p-7 rounded-xl sm:grid-cols-2"
        style={{
          background: `linear-gradient(180deg, #${prophyte.orgColor} 0%, ${bottomColor} 100%)`,
        }}
      >
        <div className="flex justify-start">
          <Image
            className="sm:pb-[17px] mb-0 "
            src={orgLogos[sortCode]}
            height={80}
            width={80}
            alt="famous"
          />
        </div>

        <div className="overflow-hidden rounded-[20px] h-[160px] w-full sm:w-[225px]">
          <Image
            className="object-cover w-full h-full"
            height={160}
            width={225}
            src={prophyte.image}
            alt={prophyte.name}
          />
        </div>

        <div className="sm:col-start-1 sm:row-start-2">
          <h5 className="sm:text-[24px] text-[20px] mb-0 pb-0 text-white font-semibold sm:leading-[36px] leading-[30px] font-montserrat">
            {prophyte.name}
          </h5>
          <p className="text-[12px] font-normal mt-1 leading-[18px] text-[#FFFFFFB2]">
            {prophyte.organization}
          </p>
        </div>
      </div>

      {/* Content Box */}
      <div
        className={`font-inter bg-[#141616] sm:px-7 px-4 sm:py-6 py-4 rounded-[16px] border border-[#383838]`}
      >
        <div className="">
          <p className="text-white sm:text-[18px] text-[13px] font-medium xs:leading-7 leading-[14px]">
            {prophyte.chapter}
          </p>

          <div className=" sm:hidden text-base text-[#fff] font-normal leading-6">
            {truncatedDescription}...
            {isLongDescription && (
              <button
                onClick={() => setShowPopup(true)}
                className="font-bold text-[#fff] ml-3   underline"
              >
                More
              </button>
            )}
          </div>
        </div>

        {/* Full description for desktop only */}
        <p className="hidden sm:block text-white sm:text-[18px] text-base font-medium xs:leading-7 leading-6">
          {prophyte.description}
        </p>
      </div>

      {/* Popup Modal aligned top on mobile */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex justify-center items-start pt-[10%]"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative bg-white max-w-md w-[85%] h-fit z-[1001]  p-4 rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="mb-2 text-lg font-bold">{prophyte.name}</h5>

            <p className="text-base leading-6 text-gray-800">
              {prophyte.description}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="size-10 z-[999] bg-white text-black text-xl rounded-full absolute -top-10 font-semibold right-0"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropytesContent;
