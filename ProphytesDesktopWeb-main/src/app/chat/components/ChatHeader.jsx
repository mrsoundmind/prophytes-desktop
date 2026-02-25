"use client";
import { Suspense, useState } from "react";

import AngleLeft from "@/public/img/icon/AngleLeft";
import MemberSvg from "@/public/img/icon/MemberSvg";
import PhoneSvg from "@/public/img/icon/PhoneSvg";
import ThreeDotSvg from "@/public/img/icon/ThreeDotSvg";
import VideoCallSvg from "@/public/img/icon/VideoCallSvg";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import MemberModal from "./MemberModal";
import NewChat from "./NewChat";

import { setActiveIndex } from "@/src/redux/slices/conversationSlice";
import GroupAvatar from "./GroupAvatar";
import ThreeDotModal from "./ThreeDotModal";
import { orgLogos } from "@/src/configs/constants";
import Membericon from "@/public/img/icon/Membericon";

export default function ChatHeader({
  conversation,
  isNewChat,
  conversationId,
  isLoading,
}) {
  // const [activeIndex, setActiveIndex] = useState(0);
  const [dotModal, setDotModal] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const isReq = path === "/chat/request";
  const newReq = path.replace(/-.*/, "");

  const dispatch = useDispatch();
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const { activeIndex } = useSelector((state) => state.conversation);

  const tabs = [
    { label: "Chat", value: "All" },
    { label: "File", value: "" },
    { label: "Photos", value: "image" },
  ];

  const handleBack = () => {
    dispatch(setShowChatFriendList(!showChatFriendList));
    dispatch(setIsMobile(!isMobile));
    router.push("/chat");
  };

  const sortName = conversation?.name
    ?.split(" ")
    ?.map((word) => word[0])
    ?.join("")
    ?.toUpperCase();

  return (
    <div className="flex items-center justify-between pb-4 text-white border-b border-black ">
      <div className="flex items-center gap-0 2xl:gap-10 sm:gap-4">
        <div className="flex items-center gap-1 xs:gap-2 ">
          <div className="block sm:hidden">
            <button
              onClick={() => handleBack()}
              className={`flex items-center justify-center border border-white rounded-full h-9 w-9 sm:w-5 sm:h-5 sm:hidden  ${
                isNewChat ? "mt-1" : "mt-0"
              }`}
            >
              <AngleLeft />
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-3">
              {/* Avatar skeleton */}
              <div>
                <div className="relative flex items-center justify-center sm:w-[50px] xs:w-8 w-7 sm:h-[50px] xs:h-8 h-7 overflow-hidden border-2 border-white rounded-full">
                  <div className="w-full h-full bg-gray-700 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Name skeleton */}
              <div className="flex-1">
                <div className="h-4 bg-gray-700 rounded-md w-28 sm:w-40 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <div>
              {isNewChat ? (
                <NewChat id={conversationId} bg="black" />
              ) : (
                <div className="flex items-center gap-3">
                  <div>
                    <div className="relative flex items-center justify-center overflow-hidden border-2 border-white rounded-full w-9 h-9 sm:w-11 sm:h-11">
                      {conversation?.type === "DIRECT" ? (
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/members/${conversation?.participants[0]?.id}`
                            )
                          }
                        >
                          <Image
                            className="w-full h-full"
                            src={
                              conversation?.participants?.[0]?.avatar ||
                              "/default-avatar.png"
                            }
                            alt={conversation?.participants?.[0]?.fullName}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ) : conversation?.type === "ORGANIZATION" ? (
                        <Image
                          className=""
                          src={orgLogos[sortName]}
                          alt={conversation?.participants?.[0]?.fullName}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <GroupAvatar
                          users={conversation?.participants}
                          isDirect={true}
                        />
                      )}
                    </div>
                  </div>

                  <div
                    className={`${
                      conversation?.type === "DIRECT" ? "cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      if (conversation?.type === "DIRECT") {
                        router.push(
                          `/members/${conversation.participants[0].id}`
                        );
                      }
                    }}
                  >
                    <h4 className="text-base font-semibold  leading-[23px] font-montserrat text-white line-clamp-1">
                      <span className="block">
                        {conversation?.type === "DIRECT" ? (
                          conversation?.participants?.[0]?.fullName
                        ) : conversation?.name ? (
                          conversation?.name
                        ) : (
                          <>
                            <span className="sm:hidden">
                              {conversation?.participants?.[0]?.firstName}
                              {conversation?.participants?.length > 1
                                ? ` & ${
                                    conversation?.participants?.length - 1
                                  } more`
                                : ""}
                            </span>

                            <span className="hidden sm:inline">
                              {conversation?.participants?.[0]?.fullName}
                              {conversation?.participants?.length > 1
                                ? ` & ${
                                    conversation?.participants?.length - 1
                                  } more`
                                : ""}
                            </span>
                          </>
                        )}
                      </span>
                    </h4>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="relative hidden h-full lg:flex ">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => dispatch(setActiveIndex(tab.value))}
              className={`relative 2xl:px-4 px-2 flex items-center text-[15px] leading-[22px]  
        transition-colors duration-200 font-montserrat
        ${
          activeIndex === tab.value
            ? "text-white font-semibold"
            : "text-[#BFBFBF] font-normal"
        }`}
            >
              {tab.label}
            </button>
          ))}

          <span
            className="absolute -bottom-[29px] h-[1px] bg-[#E9EFF0] transition-transform duration-300 ease-in-out"
            style={{
              width: `${100 / tabs.length}%`,
              transform: `translateX(${
                tabs.findIndex((t) => t.value === activeIndex) * 100
              }%)`,
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 2xl:space-x-4">
        {conversation?.type == "DIRECT" || newReq == "/chat/newchat" ? (
          <div className="flex items-center space-x-4">
            <button>
              <PhoneSvg className="cursor-not-allowed opacity-30" />
            </button>
            <button>
              <VideoCallSvg className="cursor-not-allowed opacity-30" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => (setOpen(!open), setDotModal(false))}
            className="text-white text-sm font-normal leading-[18px] flex items-center gap-1.5"
          >
            <MemberSvg className="hidden xs:block" />
            <span className="block xs:hidden">
              <Membericon />
            </span>
            {conversation?.participantCount}{" "}
            <span className="hidden xs:block">
              {" "}
              {conversation?.participantCount > 1 ? "Members" : "Member"}
            </span>
          </button>
        )}

        <button
          className="relative pl-3 border-l border-[#383838]"
          onClick={() => (setDotModal(!dotModal), setOpen(false))}
        >
          <ThreeDotSvg className="" />
        </button>

        <Suspense fallback={<div>Loading...</div>}>
          {!isReq && (
            <ThreeDotModal
              conversationId={conversationId}
              dotModal={dotModal}
              setDotModal={setDotModal}
            />
          )}
        </Suspense>

        <div className="relative">
          <MemberModal
            open={open}
            setOpen={setOpen}
            conversation={conversation}
          />
        </div>
      </div>
    </div>
  );
}
