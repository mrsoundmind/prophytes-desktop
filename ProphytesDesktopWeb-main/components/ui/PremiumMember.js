"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import verifiedbg from "@/public/img/home/verified-bg.png";
import president from "@/public/img/icon/president.svg";
import location from "@/public/img/icon/location-04.svg";
import mentor from "@/public/img/icon/mentor.svg";
import MemberSpecification from "./MemberSpecification";

import facebook from "@/public/img/icon/facebook.svg";
import twitter from "@/public/img/icon/twitter.svg";
import linkedin from "@/public/img/icon/linkedin.svg";
import insta from "@/public/img/icon/instagram.svg";
import tiktok from "@/public/img/icon/tiktok.svg";

import message from "@/public/img/icon/message.svg";
import connect from "@/public/img/icon/connect-black.svg";
import MemberDetailsSkeleton from "../skeleton/MemberDetailsSkeleton";
import { useGetMemberByIdQuery } from "@/src/redux/services/memberApi";

const PremiumMember = ({ id }) => {
  const { data: member, isLoading: loading } = useGetMemberByIdQuery(id);

  if (loading) {
    return <MemberDetailsSkeleton />;
  }
  return (
    <div className="bg-black pb-[150px] w-full">
      <div className="container">
        <Image
          className="max-w-full sm:h-[300px] h-[230px]"
          src={
            member?.data?.organization?.cover
              ? member?.data?.organization?.cover
              : verifiedbg
          }
          height={300}
          width={1500}
          alt="verified bg"
        />

        <div className="-mt-12 sm:-mt-16">
          <div className="relative">
            <div className="relative h-[150px] w-[150px] ">
              <Image
                src={member?.data.avatar}
                height={150}
                width={150}
                className="rounded-full h-[150px] w-[150px] "
                alt={member?.data?.firstName}
              />

              {/* Status Badge */}
              <div
                className="absolute right-1 top-5 w-[25px] h-[25px] flex items-center justify-center rounded-full border-white border-[1px]"
                style={{
                  backgroundColor: member?.data?.isPaid
                    ? `#${member?.data?.organization?.color}`
                    : "#16AD4B",
                }}
              >
                <svg
                  width="17"
                  height="17"
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

        <div className="bg-white sm:p-[50px] p-4 rounded-[20px] mt-10 ">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center sm:gap-5 gap-[10px]">
              <h3 className="sm:text-[36px] xs:text-[22px] text-[18px] text-black font-bold sm:leading-[48px] xs:leading-[35px] leading-[22px] ">
                {member?.data?.firstName} {member?.data?.lastName}
              </h3>
              <div>
                <Image
                  className="w-[60px] h-[30px] mt-0 sm:mt-1"
                  src={member?.data?.organization?.miniLogo}
                  alt="chapter"
                  width={151}
                  height={68}
                />
              </div>
            </div>
            <h4 className="sm:text-xl text-[14px] text-black font-bold leading-7">
              {member?.data?.relationshipStatus}
            </h4>
          </div>
          <MemberSpecification
            img={president}
            title={
              member?.data?.employment?.companyName
                ? member?.data?.employment?.companyName
                : " N / A"
            }
            status={member?.data?.status}
          />
          <MemberSpecification
            img={location}
            title={member?.data?.state}
            status={member?.data?.organization?.organization}
          />
          <MemberSpecification
            img={mentor}
            title={member?.data?.mentorship?.status}
            status="Summer 2004"
          />
          <div className="flex items-center justify-between my-[10px]">
            <div className="flex gap-[9px] items-center">
              <h3 className="sm:text-xl text-[14px] text-black font-bold leading-7">
                Follow On
              </h3>
            </div>
            <h4 className=" sm:text-xl text-[15px] text-black font-bold leading-7">
              {member?.data?.connections.total} Connect
            </h4>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4">
              <Link href={member?.data?.link?.facebook}>
                <Image src={facebook} alt="facebook" />
              </Link>
              <Link href={member?.data?.link?.twitter}>
                <Image src={twitter} alt="tiwtter" />
              </Link>
              <Link href={member?.data?.link?.linkedIn}>
                <Image src={linkedin} alt="linkedin" />
              </Link>
              <Link href={member?.data?.link?.instagram}>
                <Image src={insta} alt="instagram" />
              </Link>
              <Link href={member?.data?.link?.tiktok}>
                <Image src={tiktok} alt="tiktok" />
              </Link>
            </div>
            <div className="flex items-center xs:gap-[30px] gap-4">
              <button
                className={`flex xs:gap-[10px] gap-[7px] items-center font-inter xs:text-[16px]  trext-[11px] text-white leading-5 font-bold xs:py-[15px] py-[11px] xs:px-5 px-[13px] border border-[#ED1B35] rounded-full transition-all duration-500 ease-out bg-[#ED1B35] hover:text-white`}
              >
                <Image src={message} alt="message" />
                Message Now
              </button>
              <button
                className={`flex xs:gap-[10px] gap-[7px] items-center font-inter xs:text-[16px]  trext-[11px] text-black leading-5 font-bold xs:py-[15px] py-[11px] xs:px-5 px-[13px] border border-[#ED1B35] rounded-full transition-all duration-500 ease-out  hover:text-black`}
              >
                <Image src={connect} alt="message" />
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumMember;
