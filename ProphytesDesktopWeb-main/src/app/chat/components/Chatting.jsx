"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ChattingSkeleton from "@/components/skeleton/ChattingSkeleton";
import {
  useLazyChapterConversationByIdQuery,
  useLazyConversationByIdQuery,
  useLazyGroupConversationByIdQuery,
  useLazyOrgConversationByIdQuery,
} from "@/src/redux/services/conversationApi";
import { setParticipants } from "@/src/redux/slices/conversationSlice";
import { useDispatch, useSelector } from "react-redux";

import { getSocket } from "@/src/socket";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Message from "./Message";
import TypingUsers from "./TypingUser";

export default function Chatting({ id: conversationId, showHeaer = true }) {
  const type = useSearchParams().get("type");
  const isNewChat = conversationId?.split("-")[0] === "newchat";

  const memberlists = useSelector((state) => state.conversation.participants);
  const dispatch = useDispatch();
  const typingUsers = useSelector(
    (state) => state.typing.typingUsers[conversationId] || []
  );

  const socket = getSocket();

  const { activeIndex } = useSelector((state) => state.conversation);
  const [fetchConv, { data: conversationRes, isLoading }] =
    useLazyConversationByIdQuery(
      {
        conversationId,
      },
      { skip: !conversationId }
    );

  const [
    fetchChapterConv,
    { data: chapterConversationRes, isLoading: chapter_conv_loading },
  ] = useLazyChapterConversationByIdQuery(
    {
      conversationId,
    },
    { skip: !conversationId }
  );

  const [fetchGroupConv, { data, isLoading: group_conv_loading }] =
    useLazyGroupConversationByIdQuery(
      { id: conversationId },
      { skip: !conversationId }
    );

  const [fetchOrgConv, { data: orgConv, isLoading: org_conv_loading }] =
    useLazyOrgConversationByIdQuery(
      { conversationId },
      { skip: !conversationId }
    );

  const [conversation, setConversation] = useState({});
  const [latestMsg, setLatestMsg] = useState({});

  useEffect(() => {
    if (
      !data?.data?.conversation?.participants &&
      !conversationRes?.data?.conversations?.participants
    )
      return;
    if (data) {
      dispatch(setParticipants(data?.data?.conversation?.participants));
    }
    if (conversationRes) {
      dispatch(
        setParticipants(conversationRes?.data?.conversations?.participants)
      );
    }
  }, [conversationRes, data]);

  useEffect(() => {
    if (conversationRes?.data) {
      setConversation(conversationRes?.data?.conversations);
    }
  }, [conversationRes]);

  useEffect(() => {
    if (memberlists && type === "GROUP") {
      fetchGroupConv({
        id: conversationId,
      });
    }
  }, [memberlists, type]);

  useEffect(() => {
    if (type === "ORGANIZATION") {
      fetchOrgConv({
        conversationId,
      });
    } else if (type === "GROUP") {
      fetchGroupConv({
        id: conversationId,
      });
    } else if (type === "DIRECT") {
      fetchConv({
        conversationId,
      });
    } else if (type === "CHAPTER") {
      fetchChapterConv({
        conversationId,
      });
    } else {
      fetchConv({
        conversationId,
      });
      fetchGroupConv({
        id: conversationId,
      });
      fetchOrgConv({
        id: conversationId,
      });
    }
  }, [type, conversationId]);

  useEffect(() => {
    socket.emit("JOIN_CONVERSATION", { conversationId });
  }, [conversationId, socket.id]);

  if (group_conv_loading || org_conv_loading || isLoading) {
    return null;
  }

  return (
    <div className="mt-4 mb-2 sm:mt-0 sm:mb-0">
      {isLoading || group_conv_loading ? (
        <ChattingSkeleton />
      ) : (
        <div
          className={`flex flex-col justify-between overflow-x-hidden ${
            showHeaer
              ? "h-[calc(100dvh-4vh)] xxs:h-[calc(100dvh-3.5vh)] xss:h-[calc(100dvh-3.5vh)] xs:h-[calc(100dvh-3.5vh)] sm:h-[calc(100dvh-150px)] md:h-[calc(100dvh-10px)] lg:h-[calc(100dvh-190px)] xl:h-[calc(100dvh-130px)] 2xl:h-[calc(100dvh-130px)] 3xl:h-[calc(100dvh-133px)]"
              : "h-[calc(100dvh-35vh)] xxs:h-[calc(100dvh-57vh)] xss:h-[calc(100dvh-45vh)] xs:h-[calc(100dvh-30vh)] sm:h-[calc(100dvh-150px)] md:h-[calc(100dvh-190px)] lg:h-[calc(100dvh-190px)] xl:h-[calc(100dvh-294px)] 2xl:h-[calc(100dvh-290px)] 3xl:h-[calc(100dvh-295px)]"
          }`}
        >
          {showHeaer && (
            <div className="relative px-3 pt-4 sm:px-0">
              {type === "ORGANIZATION" ||
              conversationRes?.data?.conversations?.type === "ORGANIZATION" ? (
                <ChatHeader
                  conversation={orgConv?.data?.conversation}
                  isNewChat={isNewChat}
                  conversationId={conversationId}
                  isLoading={org_conv_loading}
                />
              ) : type === "GROUP" ||
                conversationRes?.data?.conversations?.type === "GROUP" ? (
                <ChatHeader
                  conversation={data?.data?.conversation}
                  isNewChat={isNewChat}
                  conversationId={conversationId}
                  isLoading={group_conv_loading}
                />
              ) : type === "CHAPTER" ||
                conversationRes?.data?.conversations?.type === "CHAPTER" ? (
                <ChatHeader
                  conversation={chapterConversationRes?.data?.conversation}
                  isNewChat={isNewChat}
                  conversationId={conversationId}
                  isLoading={chapter_conv_loading}
                />
              ) : (
                <ChatHeader
                  conversation={conversation}
                  isNewChat={isNewChat}
                  conversationId={conversationId}
                  isLoading={isLoading}
                />
              )}
            </div>
          )}

          {/* Messages */}
          {!isNewChat && (
            <Message
              conversationId={conversationId}
              type={
                conversation?.type || data?.data?.conversation?.type || type
              }
              latestMsg={latestMsg}
              verificationId={
                chapterConversationRes?.data?.conversation?.verificationId
              }
            />
          )}

          {typingUsers?.length > 0 && <TypingUsers typingUsers={typingUsers} />}
          {/* Chat Input */}
          {activeIndex === "" ||
            (activeIndex !== "image" && (
              <div>
                <ChatInput
                  receiverId={
                    conversation?.type === "DIRECT" || isNewChat
                      ? isNewChat
                        ? conversationId?.split("-")[2]
                        : conversation?.participants?.[0]?.id
                      : ""
                  }
                  conversationId={
                    conversation?.type !== "DIRECT" && !isNewChat
                      ? conversationId
                      : ""
                  }
                  conversationType={
                    isNewChat
                      ? "DIRECT"
                      : conversation?.type ||
                        data?.data?.conversation?.type ||
                        type
                  }
                  setLatestMsg={setLatestMsg}
                  isNewChat={isNewChat}
                  onFocus={() => setKeyboardOpen(true)}
                  onBlur={() => setKeyboardOpen(false)}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
