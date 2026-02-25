"use client";
import AngleLeft from "@/public/img/icon/AngleLeft";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const BackButton = () => {
  const dispatch = useDispatch();
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const router = useRouter();
  const handleBack = () => {
    dispatch(setShowChatFriendList(!showChatFriendList));
    dispatch(setIsMobile(!isMobile));
    router.push("/chat");
  };

  return (
    <button
      onClick={() => handleBack()}
      className="flex items-center justify-center border border-white rounded-full xs:w-8 xs:h-8 h-7 w-7 sm:w-6 sm:h-6 sm:hidden"
    >
      <AngleLeft />
    </button>
  );
};

export default BackButton;
