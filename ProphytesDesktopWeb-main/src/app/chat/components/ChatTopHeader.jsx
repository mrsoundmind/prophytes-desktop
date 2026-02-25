import PlusSVG from "@/public/img/icon/PlusSVG";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatTopHeader = () => {
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 640));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  const handleNavigate = () => {
    router.push(`/chat/new`);
    if (isMobile) {
      dispatch(setShowChatFriendList(!showChatFriendList));
    }
  };
  return (
    <div className="flex items-center justify-between mx-6 sm:mx-0">
      <h4 className="text-lg font-semibold leading-6 text-white lg:leading-8 font-montserrat lg:text-2xl">
        Chats
      </h4>
      <button
        onClick={handleNavigate}
        className="grid bg-white rounded-full cursor-pointer size-8 place-content-center"
      >
        <PlusSVG />
      </button>
    </div>
  );
};

export default ChatTopHeader;
