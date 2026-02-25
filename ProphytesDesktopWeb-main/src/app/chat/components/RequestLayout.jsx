"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useConversationByIdQuery } from "@/src/redux/services/conversationApi";

import NewChatRequest from "./NewChatRequest";
import ChatHeader from "./ChatHeader";
import BottomNav from "@/components/header/BottomNav";
import RequestSkeleton from "@/components/skeleton/RequestSkeleton";
import Arrowicon from "@/public/img/icon/Arrowicon";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";

export default function RequestLayout() {
  const query = useSearchParams();
  const router = useRouter();
  const conversationId = query.get("conversationId");

  const [conversation, setConversation] = useState(null);
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const {
    data: result,
    isLoading,
    isFetching,
  } = useConversationByIdQuery(
    {
      conversationId,
    },
    { skip: !conversationId }
  );
  // console.log(result?.data?.conversations);

  useEffect(() => {
    setConversation(result?.data?.conversations);
  }, [conversationId, result]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 640));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  if (isLoading || isFetching) {
    return <RequestSkeleton />;
  }
  const handleNavigate = () => {
    router.push(`/chat`);
    if (isMobile) {
      dispatch(setShowChatFriendList(!showChatFriendList));
    }
  };

  if (!conversationId || !conversation) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="">
          <h4 className="text-2xl font-semibold text-white">
            No Request Found!
          </h4>
          <button
            onClick={() => handleNavigate()}
            className="flex items-center justify-center w-fit gap-2 p-5 mt-4 text-white border border-white border-dashed m-auto rounded-[8px] "
          >
            <Arrowicon /> Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-5 mt-4 mb-2 sm:mt-0 sm:mb-0">
      <div className="flex flex-col sm:justify-between justify-start h-[calc(100vh-23vh)] xxs:h-[calc(100vh-18vh)] xss:h-[calc(100vh-20vh)] xs:h-[calc(100vh-13vh)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-190px)] lg:h-[calc(100vh-190px)] xl:h-[calc(100vh-155px)] 2xl:h-[calc(100vh-135px)] 3xl:h-[calc(100vh-135px)]">
        {/* Header */}
        <div className="-mt-2 sm:mb-0 mb-5 rounded-[10px] relative sm:px-4 px-5">
          <ChatHeader
            conversation={conversation}
            conversationId={conversationId}
            isLoading={isLoading}
          />
        </div>

        {/* Messages / Request */}
        <>
          {conversation?.status === "PENDING" && (
            <NewChatRequest
              name={
                conversation?.participants
                  ? conversation?.participants
                      ?.slice()
                      ?.reverse()
                      ?.slice(0, 4)
                      ?.map((p) => p?.fullName?.split(" ")[0])
                      .join(", ") +
                    (conversation?.participants?.length > 4
                      ? ` & ${conversation?.participants?.length - 4} more ...`
                      : "")
                  : conversation?.name
              }
              avatar={conversation}
              conversationId={conversation?.id}
              type={conversation?.type}
              sender={conversation?.lastMessage?.sender?.fullName}
              isLoading={isLoading}
            />
          )}
        </>

        {/* Chat Input (optional) */}
        <div className="mt-3">
          {/* <ChatInput receiverId={conversation?.participants?.[0]?.id} /> */}
        </div>

        {/* Bottom Navigation for mobile */}
        <div className="fixed bottom-0 left-0 z-50 block w-full sm:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  );
}
