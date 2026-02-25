"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import Messageicon from "@/public/img/icon/Messageicon";
import RequestIcon from "@/public/img/icon/RequestIcon";
import SettingNewSvg from "@/public/img/icon/SettingNewSvg";
import { organizations } from "@/src/configs/constants";

import { useDispatch, useSelector } from "react-redux";
import {
  useConversationRequestsQuery,
  useUnreadMessageQuery,
} from "@/src/redux/services/conversationApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { setgroupConversations } from "@/src/redux/slices/groupConversationsSlice";
import { getOrgColor } from "@/src/utils/getOrgColor";

const ChatSidebarIcon = () => {
  const { data: conversations, refetch } = useConversationRequestsQuery({});
  const { data: message, isLoading } = useUnreadMessageQuery();
  const { data: userInfo } = useUserInfoQuery();

  const router = useRouter();
  const dispatch = useDispatch();
  const newConversationReq = useSelector(
    (state) => state.conversation.newConversation
  );

  const orgColor = getOrgColor(userInfo, organizations);

  const handleNavigate = () => {
    if (conversations?.data?.conversations?.length > 0) {
      router.push(
        `/chat/request?conversationId=${conversations?.data?.conversations[0]?.id}&type=${conversations?.data?.conversations[0]?.type}`
      );
    } else {
      router.push("/chat/request");
    }
  };

  useEffect(() => {
    if (newConversationReq) {
      refetch();
    }
  }, [newConversationReq]);

  return (
    <div className=" hidden xl:block w-[100px] border-r border-[#202020] pt-6 pr-3 mr-5">
      <button
        className="relative grid place-content-center h-12 w-12 rounded-full bg-[#3A3B3C] mb-3"
        onClick={() => (
          dispatch(setgroupConversations([])), router.push("/chat")
        )}
      >
        <RequestIcon />
        {/* {message?.data?.unreadMessageCount > 0 && (
          <span
            className="grid place-content-center absolute top-0 -right-1 w-[18px] h-[18px]  rounded-full text-white text-[12px]"
            style={{ backgroundColor: `#${orgColor?.color}` }}
          >
            {message?.data?.unreadMessageCount > 0 &&
              message.data.unreadMessageCount}
          </span>
        )} */}
      </button>
      <button
        onClick={() => handleNavigate()}
        className="relative grid place-content-center h-12 w-12 rounded-full bg-[#3A3B3C] mb-3"
      >
        <Messageicon className="text-[#E9EFF0]" />
        {conversations?.data?.conversations?.length > 0 && (
          <span
            className="grid place-content-center absolute top-0 -right-1 w-[18px] h-[18px]  rounded-full text-white text-[12px]"
            style={{ backgroundColor: `#${orgColor?.color}` }}
          >
            {conversations?.data?.conversations?.length}
          </span>
        )}
      </button>
      <button className="relative grid place-content-center h-12 w-12 rounded-full bg-[#3A3B3C]/20 mb-3">
        <SettingNewSvg className="opacity-25" />
      </button>
      {/* <button className="relative grid place-content-center h-12 w-12 rounded-full bg-[#3A3B3C] mb-3">
        <NotificationSvg />
        <span className="absolute top-3 right-3 w-[10px] h-[10px] bg-[#34A853] border border-black rounded-full" />
      </button> */}
    </div>
  );
};

export default ChatSidebarIcon;
