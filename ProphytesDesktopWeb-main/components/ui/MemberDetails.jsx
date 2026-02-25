"use client";
import coverPhoto from "@/public/img/home/cover-bg.png";
import Image from "next/image";

// Social media icons

import { organizations } from "@/src/configs/constants";
import MemberDetailsSkeleton from "../skeleton/MemberDetailsSkeleton";

import BadgeSvg from "@/public/img/icon/BadgeSvg";
import { useSendConnectionRequestMutation } from "@/src/redux/services/connectionApi";
import { useGetMemberByIdQuery } from "@/src/redux/services/memberApi";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import ActionButton from "./ActionButton";
import ChatButton from "./ChatButton";
import FreeMemberCard from "./FreeMemberCard";
import PremiumMemberCard from "./PremiumMemberCard";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import StudentMemberCard from "./StudentMemberCard";

const MemberProfile = ({ id }) => {
  const { data: member, isLoading: loading } = useGetMemberByIdQuery(id);
  const { data: userInfo } = useUserInfoQuery();

  const [sendConnectionRequest, { isLoading: connRequestloading }] =
    useSendConnectionRequestMutation();

  const orgColor =
    member?.data?.organization?.shortName === "APA"
      ? "CFB53B"
      : member?.data?.organization?.color;
  const isPremium = member?.data?.isPaid;

  const isUndergrade =
    "undergraduate" == member?.data?.education?.classification?.toLowerCase();

  const isStudent = /@.+\.edu(\.|$)/i.test(member?.data?.email?.trim());

  const links = member?.data?.link;

  if (loading) {
    return <MemberDetailsSkeleton />;
  }

  const orgCover = organizations.find(
    (org) => org.id === member?.data?.organization?.id
  );

  const handleConnect = async () => {
    try {
      const finalPayload = { requestTo: id };
      const res = await sendConnectionRequest(finalPayload).unwrap();

      if (res?.status === 200) {
        SuccessAlert("Connection request sent successfully");
      }
    } catch (error) {
      ErrorAlert(
        error?.data?.data?.message || "Failed to send connection request"
      );
    }
  };

  const imageName = member?.data?.banner?.split("/");
  const result = imageName && imageName[4];
  const organization = member?.data?.education?.organization?.replace(
    /\s+/g,
    "-"
  );

  return (
    <section className={`relative`}>
      {member ? (
        <div
          className={`sm:pb-0 pb-5 w-full ${
            isPremium ? "sm:bg-[#141616] bg-black" : "bg-black"
          }`}
        >
          {/* <div className="relative hidden">
          <Image
            className={`max-w-full lg:h-[400px] md:h-[320px] sm:h-[300px] h-[200px] sm:hidden xs:block`}
            src={
              member?.data?.banner && organization == result
                ? member?.data?.banner
                : orgCover?.cover || coverPhoto
            }
            height={350}
            width={1500}
            alt="profile cover"
          />
        </div> */}
          <div className="container relative">
            {/* Cover Image */}
            <div className="relative">
              <div className="relative w-screen -mx-[calc((100vw-98%)/2)] overflow-x-hidden ">
                <Image
                  className="w-full lg:h-[524px] md:h-[320px] sm:h-[300px] xs:h-[200px] h-[150px]"
                  src={
                    member?.data?.banner && organization == result
                      ? member?.data?.banner
                      : orgCover?.cover || coverPhoto
                  }
                  height={524}
                  width={3200}
                  alt="profile cover"
                />
              </div>

              <div
                className={`${
                  isPremium && "absolute -mt-12 -bottom-28 left-[44%]"
                } sm:-mt-16 -mt-14`}
              >
                <div className="relative">
                  {/* Profile Image */}
                  <div
                    className={`relative  border-white/20 rounded-full sm:h-[160px] h-[120px] sm:w-[160px] w-[120px]  mb-5 ${
                      isPremium ? "hidden" : "block"
                    }`}
                  >
                    <Image
                      src={member?.data?.avatar}
                      height={150}
                      width={150}
                      className="w-full h-full rounded-full"
                      alt={member?.data?.firstName}
                    />

                    {/* Status Badge */}
                    <div
                      className={`absolute flex items-center justify-center  rounded-full ${
                        isPremium
                          ? "-right-1 top-2 w-12 h-12"
                          : "right-2  bottom-0 sm:w-10 w-9 sm:h-10 h-9"
                      }`}
                      style={{
                        backgroundColor: isPremium
                          ? `#${member?.data?.organization?.color}`
                          : "#16AD4B",
                      }}
                    >
                      <BadgeSvg className="size-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isUndergrade && isStudent ? (
              <StudentMemberCard
                member={member}
                isPremium={isPremium}
                links={links}
                id={id}
                handleConnect={handleConnect}
                connRequestloading={connRequestloading}
                orgColor={orgColor}
              />
            ) : isPremium ? (
              <PremiumMemberCard
                member={member}
                isPremium={isPremium}
                links={links}
                id={id}
                handleConnect={handleConnect}
                connRequestloading={connRequestloading}
                orgColor={orgColor}
              />
            ) : (
              <FreeMemberCard member={member} isPremium={isPremium} />
            )}

            {Number(userInfo?.user?.id) !== Number(id) && (
              <div
                className={`mt-3  absolute  right-5 lg:top-[470px] md:top-[250px] sm:top-[230px] xs:top-[135px] top-[90px] flex flex-col lg:flex-row gap-3  shadow-lg
                      ${
                        isPremium
                          ? "bg-white/10 p-3 backdrop-blur-md border border-white/20 shadow-lg hidden md:flex rounded-[16px]"
                          : "bg-black sm:py-[10px] py-2 sm:px-3 px-2 lg:rounded-[56px] rounded-[12px] "
                      }`}
              >
                <ChatButton
                  memberId={id}
                  isPremium={isPremium}
                  orgColor={orgColor}
                />
                <ActionButton
                  memberId={id}
                  handleConnect={handleConnect}
                  connRequestloading={connRequestloading}
                  isPremium={isPremium}
                  orgColor={orgColor}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-[350px] bg-black flex items-center justify-center">
          <h2 className="flex items-center justify-center">
            No member found !
          </h2>
        </div>
      )}
    </section>
  );
};

export default MemberProfile;
