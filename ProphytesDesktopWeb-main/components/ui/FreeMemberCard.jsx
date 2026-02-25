"use client";
import ChapterImage from "@/public/img/icon/chapter";
import JobIcon from "@/public/img/icon/job";
import LocationSvg from "@/public/img/icon/LocationSvg";
import MembersSvg from "@/public/img/icon/MembersSvg";
import { useGetMembersQuery } from "@/src/redux/services/memberApi";
import Image from "next/image";
import ViewAllNetworkModal from "./ViewAllNetwork";
import ConnectSvg from "@/public/img/icon/ConnectSvg";
export default function FreeMemberCard({ member, isPremium, orgId }) {
  const {
    data: members,
    isLoading,
    isFetching,
  } = useGetMembersQuery({
    orgId: member?.data?.organization?.id,
    page: 1,
    limit: 10,
  });
  const name = member?.data;

  const userName = (
    <div className="flex flex-wrap items-center gap-1">
      {name?.firstName}{" "}
      <h4>
        {name?.lastName}
        <span className="inline-block w-[58px] h-6 align-middle ml-2">
          <Image
            src={name?.organization?.miniLogo}
            alt="Verified Badge"
            width={50}
            height={50}
            className="w-full h-full"
          />
        </span>
      </h4>
    </div>
  );

  return (
    <div className={`${"bg-black"} rounded-[20px] mt-9 `}>
      <div className="mb-5">
        <h4 className="text-[28px] sm:max-w-[320px] max-w-[220px] leading-10  font-semibold text-white font-montserrat">
          {userName}
        </h4>
      </div>

      <div className="bg-[#141615] p-4 max-w-[340px] rounded-2xl flex flex-col gap-4 ">
        <div className="flex items-center gap-2">
          <div className="w-8 p-2 rounded-full border border-[#272525] mt-[2px] ">
            <JobIcon className="text-lg text-white " />
          </div>
          <p className="text-[#FFFFFFB2] text-[14px] leading-[22px] break-words break-all whitespace-normal">
            {member?.data?.employment?.position
              ? member?.data?.employment?.position
              : "Pending"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="grid place-content-center w-8 h-8 rounded-full border border-[#272525]">
            <LocationSvg />
          </div>
          <p className="text-[#FFFFFFB2] text-[14px] leading-[22px]">
            {member?.data?.state ? member?.data?.state : "Pending"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-8 p-2 rounded-full border border-[#272525] ">
            <ChapterImage className="text-lg text-white " />
          </div>
          <p className="text-[#FFFFFFB2] text-[14px] leading-[22px]">
            {member?.data?.education?.initiatedChapter?.name ||
            member?.data?.education?.currentChapter?.name
              ? member?.data?.education?.initiatedChapter?.name ||
                member?.data?.education?.currentChapter?.name
              : "Pending"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="grid   rounded-full place-content-center  w-9 h-9 p-2  border border-[#272525]">
            <span>
              <ConnectSvg
                className={`z-[999] relative  text-white
                `}
              />
            </span>
          </div>
          <p className="text-white text-sm leading-[22px] ">
            {member?.data?.connections?.total} Connects
          </p>
        </div>

        {/* <div className="h-[1px] bg-white/20"></div>

        <ViewAllNetworkModal
          orgId={member?.data?.organizationId}
          isPremium={isPremium}
        />
        <div className="h-[1px] bg-white/20" /> */}

        {/* <div className="flex items-center gap-2">
          <div className="flex items-center justify-center bg-black rounded-full w-7 h-7 ">
            <MembersSvg />
          </div>
          <p className="text-white text-[16px] font-semibold ">
            {members?.total} Members
          </p>
        </div> */}
        {member?.data?.connections?.members?.length > 0 && (
          <div className="flex items-center">
            {member?.data?.connections?.members
              ?.slice(0, 12)
              ?.map((user, index) => (
                <div
                  key={user?.id || index}
                  className={`w-9 h-9 border-2 border-white rounded-full overflow-hidden ${
                    index !== 0 ? "-ml-3" : ""
                  }`}
                >
                  <Image
                    src={user?.avatar && user?.avatar}
                    alt={`${user.firstName || "User"} avatar`}
                    className="object-cover w-full h-full"
                    width={32}
                    height={32}
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
