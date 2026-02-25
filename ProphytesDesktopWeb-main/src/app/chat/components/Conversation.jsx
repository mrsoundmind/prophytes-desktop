"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import dummyUser from "@/public/img/dummy-user.png";
import {
  useLazyAllConversationsQuery,
  useLazyConversationRequestsQuery,
} from "@/src/redux/services/conversationApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import { setActiveIndex } from "@/src/redux/slices/conversationSlice";
import { useDispatch, useSelector } from "react-redux";
import ChatCloseBtn from "./ChatCloseBtn";
import ConverstionContent from "./ConverstionContent";
import GroupAvatar from "./GroupAvatar";
import NewChat from "./NewChat";

export default function Conversation({ id, conversationType, name, type }) {
  const [fetchConversations, convRes] = useLazyAllConversationsQuery();
  const [fetchConversationReq, reqConversationRes] =
    useLazyConversationRequestsQuery();

  const { data: user } = useUserInfoQuery();

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const group = useSelector((state) => state.groupConversation.conversations);
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const { activeIndex } = useSelector((state) => state.conversation);
  const isGetVerified = useSelector((state) => state.user.status);

  const isNewChat = id?.split("-")[0] === "newchat";
  const isReq = pathname === "/chat/request";

  const [conversations, setConversations] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [navigating, setNavigating] = useState(false);

  const containerRef = useRef(null);
  const LIMIT = 10;

  const isSender = (senderId) => senderId === user?.user?.id;

  const isCombinedGroup = conversationType === "GROUP" && !isReq;

  useEffect(() => {
    const fetchData = async () => {
      setConversations([]);
      setSkip(0);
      setHasMore(true);

      if (isReq) {
        await fetchConversationReq({ name, type });
        return;
      }

      //  GROUP + ORGANIZATION
      if (conversationType === "GROUP") {
        const [groupRes, orgRes] = await Promise.all([
          fetchConversations({
            skip: 0,
            limit: LIMIT,
            type: "GROUP",
            name,
          }).unwrap(),
          fetchConversations({
            skip: 0,
            limit: LIMIT,
            type: "ORGANIZATION",
            name,
          }).unwrap(),
        ]);

        const combined = [
          ...(groupRes?.data?.conversations ?? []),
          ...(orgRes?.data?.conversations ?? []),
        ];

        setConversations(combined);
        setHasMore(combined.length >= LIMIT);
        return;
      }

      // normal conversation fetch (unchanged)
      await fetchConversations({
        skip: 0,
        limit: LIMIT,
        type: conversationType,
        name,
      });
    };

    fetchData();
  }, [id, isReq, conversationType, name]);

  useEffect(() => {
    if (isCombinedGroup) return;

    if (convRes?.data && !isReq) {
      if (skip === 0) {
        setConversations(convRes.data.data.conversations);
      }

      if (convRes.data.data.conversations.length < LIMIT) {
        setHasMore(false);
      }
    }
  }, [convRes, skip, isCombinedGroup]);

  // REQUEST CONVERSATIONS

  useEffect(() => {
    if (reqConversationRes?.data?.data?.conversations) {
      if (skip === 0) {
        setConversations(reqConversationRes.data.data.conversations);
      }
      setHasMore(false);
    }
  }, [reqConversationRes, conversationType]);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 640));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    if (isGetVerified) {
      setConversations([]);
      setSkip(0);
      setHasMore(true);
      fetchConversations({
        skip: 0,
        limit: LIMIT,
        type: conversationType,
        name,
      });
    }
  }, [isGetVerified]);

  // INFINITE SCROLL

  const handleScroll = useCallback(async () => {
    if (navigating) return;

    const container = containerRef.current;
    if (!container || !hasMore || convRes.isFetching) return;

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 5
    ) {
      const newSkip = skip + LIMIT;
      setSkip(newSkip);

      const res = isReq
        ? await fetchConversationReq({ name, type })
        : await fetchConversations({
            skip: newSkip,
            limit: LIMIT,
            type: conversationType,
            name,
          });

      if (!res?.data?.data?.conversations?.length) {
        setHasMore(false);
      } else {
        setConversations((prev) => [...prev, ...res.data.data.conversations]);
      }
    }
  }, [skip, hasMore, convRes.isFetching, conversationType, name, navigating]);

  const handleClick = (conversationId, type) => {
    setNavigating(true);

    const url = isReq
      ? `/chat/request?conversationId=${conversationId}&type=${type}`
      : `/chat/${conversationId}?type=${type}`;

    router.push(url);
    dispatch(setActiveIndex("All"));

    if (isMobile) {
      dispatch(setShowChatFriendList(!showChatFriendList));
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-full space-y-3 overflow-y-auto scroll-styled"
    >
      {pathname === "/chat/new" && (
        <div className="px-4 py-2 bg-[#1a1a1a] rounded-lg relative group">
          {group?.length > 0 ? (
            <div className="flex items-center gap-3">
              <GroupAvatar users={group} />
              <div className="flex-1 font-bold text-white truncate">
                New message to {group.map((u) => u?.user?.fullName).join(", ")}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Image
                src={dummyUser}
                alt="dummy user"
                className="w-12 h-12 rounded-full"
              />
              <div className="font-bold text-white">New message</div>
            </div>
          )}
          <ChatCloseBtn />
        </div>
      )}

      {isNewChat && <NewChat id={id} isShow={true} />}

      <ConverstionContent
        conversations={conversations}
        isReq={isReq}
        fn={handleClick}
        id={id}
        isSender={isSender}
        loading={convRes.isLoading}
        req_loading={reqConversationRes.isLoading}
      />

      {(convRes.isLoading || convRes.isFetching) && <p>loading...</p>}
    </div>
  );
}
