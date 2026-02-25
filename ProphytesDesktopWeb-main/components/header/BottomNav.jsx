"use client";

import ChapterSvg from "@/public/img/icon/ChapterSvg";
import ChatSvg from "@/public/img/icon/ChatSvg";
import HomeSvg from "@/public/img/icon/HomeSvg";
import MenuSvg from "@/public/img/icon/MenuSvg";
import MultipleUser from "@/public/img/icon/MultipleUser";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { useRouter } from "next/navigation";
import UserModal from "../ui/UserModal";

import { useDispatch, useSelector } from "react-redux";

import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import NewSettingSvg from "@/public/img/icon/NewSettingSvg";
import { organizations } from "@/src/configs/constants";
import { useUnreadMessageQuery } from "@/src/redux/services/conversationApi";

export default function BottomNav() {
  const [open, setOpen] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const { data: message, isLoading } = useUnreadMessageQuery();
  const router = useRouter();

  const organaizationSortName = userInfo?.user?.education?.organization
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const orgColor = () => {
    const org = organizations.find(
      (item) => item.shortName === organaizationSortName
    );

    return org?.color || null;
  };

  const totalCount =
    // Number(message?.data?.unreadMessageCount) +
    Number(message?.data?.pendingConversationCount);

  const handleBack = () => {
    dispatch(setShowChatFriendList(true));
    dispatch(setIsMobile(true));
    router.push("/chat");
  };

  return (
    <div>
      {userInfo?.user ? (
        <div className="relative bg-[#0D0D0D] z-[1001]">
          <div className="text-white bg-[#0D0D0D]">
            <div className="flex items-center justify-around py-4">
              <Link
                href="/"
                className={`flex flex-col items-center cursor-pointer  text-sm leading-[18px] font-normal ${
                  pathname == "/" ? "text-white" : "text-[#9E9E9E]"
                }`}
              >
                <HomeSvg
                  className={`${
                    pathname == "/" ? "text-white" : "text-[#9E9E9E]"
                  }`}
                />
                <span className="relative mt-1 text-xs">Home</span>
              </Link>

              <Link
                href="/members"
                className={`flex flex-col items-center cursor-pointer  text-sm leading-[18px] font-normal ${
                  pathname == "/members" ? "text-white" : "text-[#9E9E9E]"
                }`}
              >
                <MultipleUser
                  className={`${
                    pathname == "/members" ? "text-white" : "text-[#9E9E9E]"
                  }`}
                />

                <span className="mt-1 text-xs">Members</span>
              </Link>

              <Link
                href="/chapters"
                className={`flex flex-col items-center cursor-pointer  text-sm leading-[18px] font-normal ${
                  pathname == "/chapters" ? "text-white" : "text-[#9E9E9E]"
                }`}
              >
                <ChapterSvg
                  className={`${
                    pathname == "/chapters" ? "text-white" : "text-[#9E9E9E]"
                  }`}
                />
                <span className="mt-1 text-xs">Chapters</span>
              </Link>
              <button
                onClick={() => handleBack()}
                className={`flex flex-col items-center relative cursor-pointer  text-sm leading-[18px] font-normal ${
                  pathname == "/chat" ? "text-white" : "text-[#9E9E9E]"
                }`}
              >
                <ChatSvg
                  className={`${
                    pathname == "/chat" ? "text-white" : "text-[#9E9E9E]"
                  }`}
                />

                {totalCount > 0 && (
                  <span
                    className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full right-1 -top-2"
                    style={{ backgroundColor: `#${orgColor()}` }}
                  >
                    {!isLoading && totalCount}
                  </span>
                )}
                <span className="mt-1 text-xs">Messages</span>
              </button>

              <div className="relative flex flex-col justify-end ">
                {userInfo ? (
                  <li
                    className={`flex flex-col items-center text-[#9E9E9E] text-sm leading-[18px] font-normal ${
                      userInfo ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    onClick={() => setUserModal(!userModal)}
                  >
                    {/* <SettingSvg /> */}
                    <NewSettingSvg />
                    <span className="mt-1 text-xs">Setting</span>
                  </li>
                ) : (
                  <li
                    className={`flex flex-col items-center text-[#9E9E9E] text-sm leading-[18px] font-normal ${
                      userInfo ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                    onClick={() => setOpen(!open)}
                  >
                    <MenuSvg />
                    <span className="mt-1 text-xs">Menu</span>
                  </li>
                )}
              </div>
            </div>
          </div>

          <UserModal userModal={userModal} setUserModal={setUserModal} />
        </div>
      ) : null}
    </div>
  );
}
