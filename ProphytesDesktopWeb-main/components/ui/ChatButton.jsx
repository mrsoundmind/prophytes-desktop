"use client";
import { useGetConnectionStatusQuery } from "@/src/redux/services/connectionApi";
import { useConversationByRecieverQuery } from "@/src/redux/services/conversationApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MemberButtonSkeleton from "../skeleton/MemberButtonSkeleton";
import MessageSvg from "@/public/img/icon/MessageSvg";
import { setShowChatFriendList } from "@/src/redux/slices/chatSlice";
import { useSelector, useDispatch } from "react-redux";

const ChatButton = ({ memberId, isPremium, orgColor }) => {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const [isUserPremium, setIsPremium] = useState(false);
  const { data: memberConnection, isLoading: memberConnectionLoading } =
    useGetConnectionStatusQuery(memberId);
  const { data: conversation, isLoading: conversationLoading } =
    useConversationByRecieverQuery({
      recieverId: memberId,
    });
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);

  // console.log(memberId);
  const dispatch = useDispatch();

  const handleChat = async () => {
    userInfo?.user ? "" : router.push("/signin");

    if (conversation?.data?.conversation?.id) {
      router.push(`/chat/${conversation?.data?.conversation?.id}`);
    } else {
      if (isUserPremium) {
        router.push(`/chat/newchat-${userInfo?.user?.id}-${memberId}`);
      } else {
        if (isConnected) {
          router.push(`/chat/newchat-${userInfo?.user?.id}-${memberId}`);
        } else {
          ErrorAlert("You are not connected to this member");
        }
      }
    }
    if (isMobile) dispatch(setShowChatFriendList(!showChatFriendList));
  };

  useEffect(() => {
    if (
      memberConnection &&
      memberConnection?.data?.connection?.status === "connect"
    ) {
      setIsConnected(true);
    }
  });

  useEffect(() => {
    if (userInfo?.user?.isPaid) {
      setIsPremium(true);
    }
  }, [userInfo]);
  return (
    <div>
      {user_loading || memberConnectionLoading || conversationLoading ? (
        <MemberButtonSkeleton />
      ) : (
        <div className={`sm:flex items-center sm:gap-[30px] gap-4 `}>
          <div className={`relative ${isPremium ? " mb-3 group sm:mb-0" : ""}`}>
            <button
              onClick={() => handleChat()}
              className={`group relative flex justify-center xs:gap-[10px] gap-[7px] items-center font-inter
      text-[16px] leading-5  hover:[background-color:var(--hover-color)]
      transition-all duration-500 ease-out hover:border-transparent
      
      ${
        isPremium
          ? `sm:px-10 px-6 sm:h-[52px] h-12 w-full rounded-xl text-white font-medium
       backdrop-blur-md border border-white/10 
       shadow-[inset_4px_4px_10px_rgba(0,0,0,0.6),inset_-2px_-2px_15px_rgba(255,255,255,0.1)]`
          : "text-white rounded-full border-primary after:bg-black bg-white sm:px-10 px-6 sm:h-[52px] h-[50px]"
      }
      leading-5 font-medium 
      border  overflow-hidden`}
              style={{
                "--hover-color": `#${orgColor}`,
              }}
            >
              <span
                className={`z-[9] ${
                  isPremium
                    ? "group-hover:text-white text-white"
                    : " text-black"
                }`}
              >
                Message
              </span>
              <MessageSvg
                className={`z-[9] relative ${
                  isPremium ? " text-white" : "text-black "
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
