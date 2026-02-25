"use client";
import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import PremimumMemberBadge from "@/src/assets/icon/PremimumMemberBadge";
import VerifiedMemberBadge from "@/src/assets/icon/VerifiedMemberBadge";
import Tilt from "react-parallax-tilt";
import MemberUserSvg from "@/public/img/icon/MemberUserSvg";

const MemberCard = ({ member }) => {
  const [bgColor, setBgColor] = useState("");

  useState(() => {
    if (member?.organization?.shortName === "APA") {
      setBgColor("#000000");
    } else {
      setBgColor(`#${member.organization?.color}`);
    }
  }, [member.organization?.color]);

  const premium = member?.isVerified && member?.isPaid;

  return (
    <>
      <Tilt>
        {/* "hover:bg-[var(--hover-color)]" */}
        <div
          className={`group pt-8 rounded-[20px] bg-black h-[430px] transition-colors duration-500`}
          style={{
            backgroundColor: premium ? bgColor : "black",
          }}
        >
          <div className="rounded-[10px]  relative">
            <div className="flex justify-between px-8 ">
              <div
                className={`border grid place-content-center  ${
                  premium ? "border-white" : "border-[#383838]"
                } rounded-full px-1 py-[2px] `}
              >
                <Image
                  src={member?.organization?.miniLogo}
                  alt="Verified Badge"
                  width={50}
                  height={50}
                  className="w-[60px] h-[30px]"
                />
              </div>

              {premium ? (
                <div className="flex items-center justify-center p-1 bg-white rounded-full">
                  <PremimumMemberBadge
                    color={`#${member?.organization?.color}`}
                  />
                </div>
              ) : member?.isVerified ? (
                <VerifiedMemberBadge />
              ) : null}
            </div>

            <div className="relative flex justify-center mt-7">
              <div className="relative h-[140px] w-[140px] m-auto text-center">
                <div
                  className={`rounded-full p-2 bg-transparent h-[140px] w-[140px] animated-shadow transition-shadow duration-500 ${
                    premium
                      ? `shadow-[inset_-8px_-8px_16px_var(--dynamic-color),_inset_8px_8px_16px_#ffffff]`
                      : `group-hover:shadow-[inset_-8px_-8px_16px_var(--dynamic-color),_inset_8px_8px_16px_#ffffff]`
                  }`}
                  style={{
                    "--dynamic-color": `#${member?.organization?.color}`,
                  }}
                >
                  <Image
                    src={member?.avatar}
                    height={140}
                    width={140}
                    className="block w-full h-full mx-auto rounded-full"
                    alt={member?.firstName}
                  />
                </div>

                {/* Status Badge */}
                <div
                  className={`absolute -right-[2px] bottom-4 p-1 bg-[#202020]  duration-300 flex items-center justify-center rounded-full h-9 w-9 ${
                    premium ? "bg-opacity-30" : "group-hover:bg-opacity-30"
                  }`}
                >
                  <div
                    className=" w-[28px] h-[28px] flex items-center justify-center rounded-full"
                    style={{
                      backgroundColor: member?.isPaid
                        ? `#${member?.organization?.color}`
                        : "#16AD4B",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 21 21"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.48438 10.501L9.49271 12.5177L13.5177 8.48438"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.45937 2.54258C10.0344 2.05091 10.976 2.05091 11.5594 2.54258L12.876 3.67591C13.126 3.89258 13.5927 4.06758 13.926 4.06758H15.3427C16.226 4.06758 16.951 4.79258 16.951 5.67591V7.09258C16.951 7.41758 17.126 7.89258 17.3427 8.14258L18.476 9.45925C18.9677 10.0342 18.9677 10.9759 18.476 11.5592L17.3427 12.8759C17.126 13.1259 16.951 13.5926 16.951 13.9259V15.3426C16.951 16.2259 16.226 16.9509 15.3427 16.9509H13.926C13.601 16.9509 13.126 17.1259 12.876 17.3426L11.5594 18.4759C10.9844 18.9676 10.0427 18.9676 9.45937 18.4759L8.14271 17.3426C7.89271 17.1259 7.42604 16.9509 7.09271 16.9509H5.65104C4.76771 16.9509 4.04271 16.2259 4.04271 15.3426V13.9176C4.04271 13.5926 3.86771 13.1259 3.65937 12.8759L2.53437 11.5509C2.05104 10.9759 2.05104 10.0426 2.53437 9.46758L3.65937 8.14258C3.86771 7.89258 4.04271 7.42591 4.04271 7.10091V5.66758C4.04271 4.78424 4.76771 4.05924 5.65104 4.05924H7.09271C7.41771 4.05924 7.89271 3.88424 8.14271 3.66758L9.45937 2.54258Z"
                        stroke="white"
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* 
            <div className="absolute w-0 font-bold text-center transform -rotate-90 left-3 md:left-2 lg:left-3 whitespace-nowrap writing-mode-vertical-rl md:text-base lg:text-xl">
              <h4>
                {member?.education?.seasonMemberSince}{" "}
                {member?.education?.yearMemberSince}
              </h4>
            </div> */}

            <div
              className={`flex flex-col items-center 
                
                transition-all duration-300 rounded-t-[20px] px-3   ${
                  premium
                    ? `[border-image-source:linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(102,102,102,0)_100%)]
                [border-image-slice:1] [background-image:linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(20,22,22,0)_100%)]
                rounded-b-[16px] mt-[38px]  overflow-hidden`
                    : "mt-7"
                }
              `}
            >
              <div>
                <p
                  className={`text-xs text-center font-medium text-[#ffffff]/70 mb-1 ${
                    premium ? "mt-6" : ""
                  }`}
                >
                  {member?.education?.initiatedChapter?.name || "\u00A0"}
                </p>

                <h3
                  className={`font-semibold   line-clamp-1 font-montserrat text-white text-center ${
                    premium
                      ? "mb-3 leading-[30px]  text-xl"
                      : "mb-[30px] text-2xl leading-9"
                  }`}
                >
                  {member.firstName && member.lastName ? (
                    <>
                      {member.firstName} {member.lastName}
                    </>
                  ) : (
                    "N/A"
                  )}
                </h3>

                <Link
                  href={`/members/${member.id}`}
                  className={`group flex items-center gap-[6px]  py-[11px] px-5 bg-white text-base  font-medium w-fit  m-auto  text-black leading-5  rounded-full border-[#e6e6e6]  border-[1px] relative z-[1] overflow-hidden transition-all duration-300 ease-in-out  before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%]  before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:bg-[var(--before-color)] before:duration-[800ms] hover:before:-top-[96%] ${
                    premium
                      ? "mb-6 hover:text-white"
                      : member.organization?.shortName === "APA"
                      ? "border border-black hover:text-white mb-8"
                      : "hover:text-white mb-8"
                  }`}
                  style={{
                    "--before-color": bgColor,
                  }}
                >
                  <MemberUserSvg
                    className={`${
                      member.organization?.shortName === "APA"
                        ? " "
                        : " hover:text-white"
                    }`}
                  />
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Tilt>
    </>
  );
};

export default MemberCard;
