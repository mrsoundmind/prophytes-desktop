"use client";
import BadgeSvg from "@/public/img/icon/BadgeSvg";
import Image from "next/image";
import Link from "next/link";

// Social media icons
import LocationSvg from "@/public/img/icon/LocationSvg";
import ChapterImage from "@/public/img/icon/chapter";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCheck,
  faEnvelope,
  faGlobe,
  faHeart,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionButton from "./ActionButton";
import ChatButton from "./ChatButton";
import JobIcon from "@/public/img/icon/job";
import ConnectSvg from "@/public/img/icon/ConnectSvg";
import cap from "@/public/img/status/gradudationCap.png";
import { useUserInfoQuery } from "@/src/redux/services/userApi";

export default function StudentMemberCard({
  member,
  isPremium,
  links,
  id,
  handleConnect,
  connRequestloading,
  orgColor,
}) {
  const { data: user } = useUserInfoQuery();
  const socialFields = [
    "website",
    "mobileNumber",
    "email",
    "facebook",
    "twitter",
    "linkedIn",
    "instagram",
    "tiktok",
  ];
  const isAllLinksEmpty =
    links && socialFields.every((key) => !String(links[key] || ""));

  const isValidUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const socialLinks = [
    { icon: faGlobe, path: links?.website },
    { icon: faEnvelope, path: links?.email },
    { icon: faPhone, path: links?.mobileNumber },
    { icon: faFacebookF, path: links?.facebook },
    { icon: faTwitter, path: links?.twitter },
    { icon: faLinkedin, path: links?.linkedIn },
    { icon: faInstagram, path: links?.instagram },
    { icon: faTiktok, path: links?.tiktok },
  ];
  // console.log(member?.data?.id);
  console.log(user?.user?.id);

  const userName = (
    <>
      {member?.data?.firstName} {member?.data?.lastName}
      <span className="inline-block w-[58px] h-6 align-middle ml-2">
        <Image
          src={member?.data?.organization?.miniLogo}
          alt="Verified Badge"
          width={50}
          height={50}
          className="w-full h-full"
        />
      </span>
    </>
  );

  return (
    <div
      className=" relative w-full lg:px-12 lg:py-[60px] sm:pt-0 pt-20 sm:pb-0 pb-6 px-4 lg:bottom-52 md:bottom-16 bottom-10  bg-white/10 backdrop-blur-lg rounded-[40px]  sm:w-[530px] border-[transparent]
   border-[3px]
  border-solid
    shadow-[0px_74px_100px_0px_rgba(22,25,46,0.25)]
    
  "
    >
      <div>
        <Image
          src={cap}
          alt="Graduation Cap"
          width={268}
          height={159}
          className="absolute -translate-x-1/2 top-1 left-1/2 sm:top-8 sm:right-0 sm:left-auto sm:translate-x-0"
        />
      </div>

      <div className="flex flex-col items-center justify-between md:flex-row">
        <div
          className={`relative  mb-5  border-[6px] rounded-full border-white/20`}
        >
          <Image
            src={member?.data?.avatar}
            height={180}
            width={180}
            className="sm:w-[180px] sm:h-[180px] w-[140px] h-[140px] rounded-full"
            alt={member?.data?.firstName}
          />

          {/* Status Badge */}
          <div
            className={`absolute flex items-center justify-center  rounded-full ${
              isPremium
                ? "right-0  bottom-0 h-10 w-10"
                : "sm:right-2 -right-1 top-[10px] sm:w-7 w-6 sm:h-7 h-6"
            }`}
            style={{
              backgroundColor: isPremium
                ? `#${member?.data?.organization?.color}`
                : "#16AD4B",
            }}
          >
            <BadgeSvg className="sm:size-26 size-5" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <div>
              {/* <h3 className="block sm:hidden text-[32px] leading-[48px] font-montserrat font-medium text-white">
              Prophytes 
            </h3> */}
            </div>
            <h4 className=" sm:text-[48px] text-[32px] sm:leading-[60px] leading-[40px] sm:font-bold font-medium font-montserrat text-white mt-[2px] text-center block m-auto">
              #{member?.data?.prophytesId ? member?.data?.prophytesId : id}
            </h4>
          </div>
          <div className="flex items-center gap-2 rounded-full">
            <p className="block text-lg text-white uppercase">Prophytes</p>
            <button className="text-white border border-white/20 px-2 rounded-full h-[23px] text-xs leading-[18px]">
              Student
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center w-full">
        {member?.data?.id !== user?.user?.id && (
          <div
            className={`mt-3  sm:hidden flex  gap-3  rounded-xl shadow-lg items-center justify-center  w-full bg-white/10 px-2  backdrop-blur-md border border-white/20   
  `}
          >
            <div className="w-full mt-3">
              <ChatButton memberId={id} isPremium={isPremium} />
            </div>
            <div className="w-full">
              <ActionButton
                memberId={id}
                handleConnect={handleConnect}
                connRequestloading={connRequestloading}
                isPremium={isPremium}
                orgColor={orgColor}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 ">
        <h4 className="text-[28px] sm:max-w-[370px] w-full leading-10  font-semibold text-white font-montserrat">
          {userName}
        </h4>
      </div>

      <div
        className={`${
          isAllLinksEmpty || links == null
            ? ""
            : "flex flex-row justify-between sm:flex-col"
        }`}
      >
        <div>
          <div className="grid sm:grid-cols-2 gap-5 bg-white/5  my-4 sm:p-4 p-5 rounded-2xl shadow shadow-[#0000003D] w-full  ">
            <div className="flex items-center gap-2">
              <div>
                <div className="grid place-content-center rounded-full  h-10 w-10 border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                  <JobIcon className="text-lg text-white " />
                </div>
              </div>
              <p className="text-white text-sm leading-[22px] ">
                {member?.data?.employment?.status
                  ? member?.data?.employment?.status
                  : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <div className="grid place-content-center h-10 w-10 rounded-full border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                  <LocationSvg />
                </div>
              </div>
              <p className="text-white text-sm leading-[22px] ">
                {member?.data?.state ? member?.data?.state : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <div className="grid place-content-center rounded-full h-10 w-10 border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                  <ChapterImage className="text-lg text-white " />
                </div>
              </div>
              <p className="text-white text-sm leading-[22px]  font-mulish">
                {member?.data?.education?.initiatedChapter?.name
                  ? member?.data?.education?.initiatedChapter?.name
                  : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="grid place-content-center rounded-full h-10 w-10  border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                <FontAwesomeIcon icon={faCheck} className="text-white" />
              </div>
              <p className="text-white text-sm leading-[22px] ">
                Active Member
              </p>
            </div>
          </div>

          <div
            className={`grid sm:grid-cols-2 gap-5 bg-white/5 sm:p-4 p-5 rounded-2xl shadow shadow-[#0000003D]   ${
              isAllLinksEmpty || links == null
                ? "w-full"
                : " sm:w-full xs:w-[260px] w-[250px]"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className="grid place-content-center rounded-full h-10 w-10 border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                <FontAwesomeIcon icon={faHeart} className="text-white" />
              </div>
              <p className="text-white text-sm leading-[22px] ">
                {member?.data?.relationshipStatus
                  ? member?.data?.relationshipStatus
                  : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="grid place-content-center rounded-full  h-10 w-10 border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                <Image
                  src={"/img/icon/lecture.svg"}
                  alt="job"
                  width={20}
                  height={20}
                  className=""
                />
              </div>
              <p className="text-white text-sm leading-[22px] ">
                {member?.data?.mentorship?.status
                  ? member?.data?.mentorship?.status
                  : "Pending"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="grid place-content-center rounded-full  h-10 w-10 border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                <Image
                  src={"/img/icon/cloud-off.svg"}
                  alt="job"
                  width={20}
                  height={20}
                  className=""
                />
              </div>
              <p className="text-white text-sm leading-[22px] ">
                {member?.data?.education?.seasonMemberSince
                  ? member?.data?.education?.seasonMemberSince
                  : "Pending"}
                {/* {member?.data?.education?.yearMemberSince} */}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="grid place-content-center rounded-full  h-10 w-10 border border-[#FFFFFF33] bg-white/10 shadow-[5px_4px_10px_0px_#00000040,inset_1px_1px_0px_0px_#FFFFFF40] ">
                <span>
                  <ConnectSvg
                    className={`z-[999] relative   text-white
                    `}
                  />
                </span>
              </div>
              <p className="text-white text-sm leading-[22px] ">
                {member?.data?.connections?.total} Connects
              </p>
            </div>
          </div>
        </div>
        {links && (
          <div className="flex flex-col gap-2 mt-5 sm:flex-row">
            {socialLinks
              .filter((item) => isValidUrl(item.path))
              .map((social, index) => (
                <div key={index}>
                  <Link
                    href={social.path}
                    target="_blank"
                    className={`grid place-content-center h-11 w-11 rounded-full  border border-white/20  text-white  bg-[#343535]  hover:[background-color:var(--hover-color)] transition-all duration-500 ease-in-ou `}
                    style={{
                      "--hover-color": `#${orgColor}`,
                      boxShadow:
                        "5px 4px 10px 0px rgba(0,0,0,0.25), inset 0px 1px 0px 0px rgba(255,255,255,0.25)",
                    }}
                  >
                    <FontAwesomeIcon icon={social.icon} />
                  </Link>
                </div>
              ))}
            {links?.mobileNumber && (
              <div
                className="grid place-content-center h-11 w-11 rounded-full border border-white/20 text-white bg-[#343535] hover:[background-color:var(--hover-color)] transition-all duration-500 ease-in-out"
                style={{
                  "--hover-color": `#${orgColor}`,
                  boxShadow:
                    "5px 4px 10px 0px rgba(0,0,0,0.25), inset 0px 1px 0px 0px rgba(255,255,255,0.25)",
                }}
              >
                {links?.mobileNumber && (
                  <Link
                    href={`https://wa.me/${links.mobileNumber.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
