"use client";

import ChattingSkeleton from "@/components/skeleton/ChattingSkeleton";
import { useAllConversationsQuery } from "@/src/redux/services/conversationApi";
import { setShowChatFriendList } from "@/src/redux/slices/chatSlice";
import { setGrpConversationDelete } from "@/src/redux/slices/conversationSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Chat = () => {
  const [isMobile, setIsMobile] = useState(null);
  const router = useRouter();
  const { showChatFriendList } = useSelector((state) => state.chat);

  const deleteGroup = useSelector(
    (state) => state.conversation.grpConversationDelete
  );
  const dispatch = useDispatch();

  // Detect screen size on client
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  const {
    data: conversations,
    isLoading,
    isFetching,
    isSuccess,
    refetch,
  } = useAllConversationsQuery(
    {
      limit: 1,
      skip: 0,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (deleteGroup) {
      dispatch(setGrpConversationDelete(null));
      refetch();
    }
  }, [deleteGroup]);

  useEffect(() => {
    if (
      isMobile === false &&
      !isLoading &&
      conversations?.data?.conversations[0]?.id
    ) {
      router.push(
        `/chat/${conversations.data.conversations[0].id}?type=${conversations.data.conversations[0].type}`
      );
    } else {
      dispatch(setShowChatFriendList(true));
    }
  }, [isMobile, isLoading, conversations, router]);

  if (isMobile === null) return null;

  if (isLoading || isFetching) {
    return <ChattingSkeleton />;
  }
  if (isSuccess && conversations?.data?.conversations?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <h4 className="text-xl font-semibold text-white">No Message Found!</h4>
      </div>
    );
  }

  return null;
};

export default Chat;
