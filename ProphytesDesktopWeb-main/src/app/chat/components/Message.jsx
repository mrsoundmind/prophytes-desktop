"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import MessageSkeleton from "@/components/skeleton/MessageSkeleton";
import { organizations } from "@/src/configs/constants";
import {
  useLazyAllConversationsQuery,
  useLazyGetChapterVerificationQuery,
} from "@/src/redux/services/conversationApi";
import { useLazyAllMessagesQuery } from "@/src/redux/services/messageApi";
import { useDispatch, useSelector } from "react-redux";

import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { getOrgColor } from "@/src/utils/getOrgColor";
import Image from "next/image";

import FileIcon from "@/public/img/icon/file";
import { HandleHyperLink } from "@/src/app/chat/components/HandleHyperLink";
import { getColorById } from "@/src/utils/getColorById";
import AllFiles from "./AllFiles";
import AllImages from "./AllImages";
import FirstVerifiedCard from "./FirstVerifiedCard";
import ImageSkeleton from "./ImageSkeleton";
import MessageOptions from "./MessageOptions";
import UnlockChapter from "./UnlockChapter";
import VerificationCard from "./VerificationCard";

export default function Message({
  conversationId,
  type,
  latestMsg,
  verificationId,
}) {
  const refetchMsg = useSelector((state) => state.messages.refetchMessage);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoad, setImageLoad] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);
  const [lightboxZoom, setLightboxZoom] = useState(1); // For basic zoom
  const [initialLoad, setInitialLoad] = useState(true);
  const [hovered, setHovered] = useState(null);
  const [fetchMessages, msgRes] = useLazyAllMessagesQuery();
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const { data: user } = useUserInfoQuery();
  const [msgs, setMsgs] = useState([]);
  const [skip, setSkip] = useState(0);
  const [isNewMsg, setIsNewMsg] = useState(false);
  const isNewChat = conversationId?.split("-")[0] === "newchat";
  const [hasMore, setHasMore] = useState(true);
  const [fetchConv, fetchConvRes] = useLazyAllConversationsQuery();
  const [chapterVerificationStatus, setChapterVerificationStatus] =
    useState(null);
  const { activeIndex } = useSelector((state) => state.conversation);
  const router = useRouter();
  const orgColor = getOrgColor(userInfo, organizations);

  const msg = useSelector((state) => state.messages.message);
  const newmsg = useSelector((state) => state.messages.message);
  const newReaction = useSelector((state) => state.messages.reaction);
  const messagesEndRef = useRef(null);
  const lightboxRef = useRef(null); // Ref for zoom handling
  const participants = useSelector((state) => state.conversation.participants);
  const dispatch = useDispatch();
  const [
    fetchChapterVerification,
    { data: chapterVerification, isLoading: chapterVerificationLoading },
  ] = useLazyGetChapterVerificationQuery();

  const isSender = (senderId) => senderId === user?.user?.id;
  const isEmojiOnly = (text) => {
    const emojiRegex = /^[\p{Extended_Pictographic}\u200d\s]+$/u.test(
      text?.trim()
    );
    return emojiRegex;
  };

  useEffect(() => {
    if (!conversationId || !type) return;
    fetchMessages({ skip: 0, limit: 20, conversationId, type });
  }, [conversationId, type]);

  const senderTextColor = getColorById(orgColor?.id);

  useEffect(() => {
    if (refetchMsg) {
      setMsgs([]);
      setSkip(0);
      fetchMessages({ skip: 0, limit: 20, conversationId, type });
    }
  }, [refetchMsg]);

  useEffect(() => {
    if (msgRes?.data) {
      if (skip === 0) {
        setMsgs(msgRes.data.data.messages);
      }
      if (msgRes.data.data.messages.length < 20) {
        setHasMore(false);
      }
    }
  }, [msgRes]);

  useEffect(() => {
    if (!newmsg) return;

    if (newmsg?.conversationId === conversationId) {
      setMsgs((prev) => [newmsg?.message, ...prev]);

      // setIsNewMsg(true);
    }
  }, [conversationId, newmsg]);

  useEffect(() => {
    if (skip === 0 && messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [msgs]);

  useEffect(() => {
    if (newReaction?.conversationId !== conversationId) return;

    setMsgs((prevMsgs) =>
      prevMsgs.map((m) =>
        m.id.toString() === newReaction?.reaction.messageId.toString()
          ? {
              ...m,
              reactions: newReaction?.reaction.emoji
                ? [
                    ...(m.reactions || []).filter(
                      (r) => r.userId !== newReaction?.reaction.userId
                    ),
                    newReaction?.reaction,
                  ]
                : (m.reactions || []).filter(
                    (r) => r.userId !== newReaction?.reaction.userId
                  ),
            }
          : m
      )
    );
  }, [conversationId, newReaction]);

  const handleScroll = useCallback(async () => {
    const container = messagesEndRef.current;
    if (!container || !hasMore || msgRes.isFetching) return;

    if (container.scrollTop === 0) {
      const prevScrollHeight = container.scrollHeight;

      const newSkip = skip + 20;
      setSkip(newSkip);

      const res = await fetchMessages({
        skip: newSkip,
        limit: 20,
        conversationId,
        type,
      });

      if (res?.data?.data?.messages?.length) {
        setMsgs((prev) => [...prev, ...res.data.data.messages]);
        requestAnimationFrame(() => {
          const newScrollHeight = container.scrollHeight;
          container.scrollTop = newScrollHeight - prevScrollHeight;
        });
      } else {
        setHasMore(false);
      }
    }
  }, [skip, hasMore, msgRes.isFetching]);

  useEffect(() => {
    if (latestMsg && Object.keys(latestMsg).length > 0) {
      const newMsg = {
        content: latestMsg?.content,
        conversationId,
        sender: {
          id: user?.user?.id,
          name: user?.user?.name,
          avatar: user?.user?.avatar,
        },
        ...latestMsg,
      };

      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
      setMsgs((prev) => [newMsg, ...prev]);
    }
  }, [latestMsg]);

  // Custom lightbox handlers
  const openLightbox = (index, slides) => {
    // console.log("Opening lightbox with slides:", slides);
    setLightboxSlides(slides);
    setLightboxIndex(index);
    setLightboxOpen(true);
    setLightboxZoom(1); // Reset zoom
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setLightboxIndex(
      (prev) => (prev - 1 + lightboxSlides.length) % lightboxSlides.length
    );
  };

  const nextImage = () => {
    // console.log("Next image");
    setLightboxIndex((prev) => (prev + 1) % lightboxSlides.length);
  };

  const handleZoom = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setLightboxZoom((prev) => Math.min(prev + 0.1, 3)); // Zoom in
    } else {
      setLightboxZoom((prev) => Math.max(prev - 0.1, 1)); // Zoom out
    }
  };

  // const handleNewMsg = () => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollTo({
  //       top: messagesEndRef.current.scrollHeight,
  //       behavior: "smooth",
  //     });
  //   }

  //   setIsNewMsg(false);
  // };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, lightboxSlides.length]);

  useEffect(() => {
    // Reset loading whenever lightboxIndex changes
    setImageLoad(true);
  }, [lightboxIndex]);

  // Scroll to the bottom whenever user switches to "All" tab
  useEffect(() => {
    if (activeIndex === "All" && messagesEndRef.current) {
      const container = messagesEndRef.current;
      requestAnimationFrame(() => {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [activeIndex]);

  const isLoadingMessages =
    msgRes.isLoading || msgRes.isFetching || !msgRes.isSuccess;
  // ||msgs.length === 0;

  useEffect(() => {
    if (!msgRes.isLoading && msgRes.isSuccess) {
      setInitialLoad(false);
    }
  }, [msgRes.isLoading, msgRes.isSuccess]);

  // useEffect(() => {
  //   const container = messagesEndRef.current;
  //   if (!container) return;

  //   const checkIfAtBottom = () => {
  //     const threshold = 100; // pixels from bottom
  //     const isAtBottom =
  //       container.scrollHeight - container.scrollTop - container.clientHeight <
  //       threshold;

  //     if (isAtBottom && isNewMsg) {
  //       setIsNewMsg(false);
  //     }
  //   };

  //   // Check on mount and when new messages arrive
  //   checkIfAtBottom();

  //   // Check on every scroll
  //   container.addEventListener("scroll", checkIfAtBottom);

  //   // Also check when new messages are added (in case auto-scroll didn't trigger)
  //   return () => {
  //     container.removeEventListener("scroll", checkIfAtBottom);
  //   };
  // }, [isNewMsg]); // Only re-subscribe when isNewMsg becomes true

  useEffect(() => {
    if (verificationId) {
      fetchChapterVerification({ id: verificationId });
    }
  }, [verificationId, user]);
  useEffect(() => {
    if (
      chapterVerification?.data?.verification?.workflowStage ===
        "WAITING_INTRO" &&
      chapterVerification?.data?.verification?.isFirstMember
    ) {
      localStorage.setItem("firstFember", true);
    } else {
      localStorage.setItem("firstFember", false);
    }
  }, [chapterVerification?.data]);

  // useEffect(() => {
  //   if (
  //     chapterVerification?.data &&
  //     chapterVerification?.data?.verification?.defaultMessageId == undefined
  //   ) {
  //     localStorage.setItem("enterChapter", true);
  //   } else {
  //     localStorage.setItem("enterChapter", false);
  //   }
  // }, [chapterVerification?.data?.verification]);

  if (initialLoad) return <MessageSkeleton />;

  return (
    <div
      className="flex-1 h-full p-0 px-3 pb-3 space-y-3 overflow-x-hidden overflow-y-auto sm:pr-4 scroll-styled sm:px-0"
      ref={messagesEndRef}
      onScroll={handleScroll}
      style={{ position: "relative" }}
    >
      <>
        {(isLoadingMessages || chapterVerificationLoading) && (
          <MessageSkeleton />
        )}
        {activeIndex === "All" ? (
          <div className="">
            {chapterVerification?.data &&
              chapterVerification?.data?.verification?.workflowStage ===
                "WAITING_INTRO" &&
              chapterVerification?.data?.verification?.status === "PENDING" &&
              chapterVerification?.data?.verification?.isFirstMember && (
                <div className="flex items-center justify-center w-full">
                  <FirstVerifiedCard verificationId={verificationId} />
                </div>
              )}

            <div>
              {msgs
                .slice()
                .reverse()
                .map((msg, idx) => {
                  let reactions = [];
                  const reciverOrgColor = msg?.sender?.organization?.color;
                  const id = msg?.sender?.organization?.id;
                  // const textColor = id === "2" || id === "8" ? "black" : "white";
                  const textColor =
                    id === "2" || id === "8"
                      ? "black"
                      : id === "1" ||
                        id === "3" ||
                        id === "4" ||
                        id === "5" ||
                        id === "6" ||
                        id === "7" ||
                        id === "9"
                      ? "white"
                      : "black";

                  let count = 0;

                  if (msg?.reactions?.length > 0) {
                    msg?.reactions?.forEach((reaction) => {
                      if (!reactions.includes(reaction.emoji)) {
                        reactions.push(reaction.emoji);
                      }
                      count++;
                    });
                  }

                  const text = msg?.content;
                  const cleanText = text?.includes("{")
                    ? text?.slice(0, text?.indexOf("{"))?.trim()
                    : text;

                  // console.log();

                  return (
                    <>
                      {msg?.metadata?.verificationType &&
                        Number(msg?.metadata?.verifiedUserId) !==
                          Number(user?.user?.id) && (
                          <div className="flex items-center justify-center ">
                            {type == "CHAPTER" && (
                              <VerificationCard
                                content={JSON.parse(msg?.content)}
                                metadata={msg?.metadata}
                              />
                            )}
                          </div>
                        )}
                      <div
                        key={msg?.id || idx}
                        className={`flex items-end    gap-2 relative
    ${
      msg?.type === "SYSTEM"
        ? "justify-center pt-1 mt-1"
        : isSender(msg?.sender?.id)
        ? "justify-end pt-3 mt-2"
        : "justify-start items-stretch pt-3 mt-2 mb-3"
    }
  `}
                      >
                        <div>
                          {msg?.metadata?.targetUserId == userInfo?.user?.id}
                        </div>
                        <div>
                          {msg?.type !== "SYSTEM" &&
                            !isSender(msg?.sender?.id) && (
                              <div className="w-8 h-8">
                                <Image
                                  src={msg?.sender?.avatar}
                                  alt="avatar"
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full"
                                />
                              </div>
                            )}
                        </div>

                        {msg?.type !== "SYSTEM" &&
                          !isSender(msg?.sender?.id) && (
                            <p className="absolute text-xs text-white capitalize left-10 -top-1">
                              {msg?.sender?.fullName}
                            </p>
                          )}

                        {msg?.type === "EMOJI" ? (
                          <div className="p-0 m-0 bg-transparent">
                            <Image
                              src={msg?.attachments?.[0]?.url || ""}
                              alt="emoji"
                              width={50}
                              height={50}
                              className="bg-transparent"
                            />
                          </div>
                        ) : (
                          <div
                            className={`relative   [&_*]:text-inherit overflow-hidden whitespace-pre-line  ${
                              msg?.type === "SYSTEM" && cleanText
                                ? "bg-[#ffffff05] break-words   p-3.5 text-[13px] font-medium rounded-[4px] shadow-[inset_0px_0px_2px_0px_rgb(51_49_49_/_50%)] "
                                : "rounded-xl text-sm max-w-sm"
                            } ${
                              msg?.fileType
                                ? ""
                                : msg?.type === "TEXT" &&
                                  isEmojiOnly(msg?.content)
                                ? "text-[50px] p-0 leading-none"
                                : `px-4 py-2 ${
                                    isSender(msg?.sender?.id)
                                      ? "rounded-br-none"
                                      : msg?.type === "SYSTEM"
                                      ? "rounded-[4px]"
                                      : "rounded-bl-none"
                                  }`
                            }`}
                            style={{
                              backgroundColor: isEmojiOnly(msg?.content)
                                ? ""
                                : isSender(msg?.sender?.id)
                                ? `#${orgColor?.color}`
                                : `#${reciverOrgColor}`,
                              color: isSender(msg?.sender?.id)
                                ? senderTextColor
                                : msg?.type === "SYSTEM"
                                ? "gray"
                                : textColor,
                            }}
                          >
                            {msg?.parent && (
                              <div className="mb-2 px-2  py-1 border-l-4 border-blue-400 bg-black/20 rounded-md text-xs text-gray-200 max-w-[220px] truncate overflow-hidden font-montserrat">
                                <p className="w-full truncate">
                                  {msg?.parent.content}
                                </p>
                              </div>
                            )}

                            {count > 0 && (
                              <span className="absolute left-0 flex items-center gap-1 px-2 py-1 text-black bg-white rounded-full -bottom-5">
                                {reactions.map((emoji, i) => (
                                  <span key={i}>{emoji}</span>
                                ))}
                                {count}
                              </span>
                            )}
                            {msg?.type === "TEXT" && (
                              <div
                                className={`whitespace-pre-line font-montserrat ${
                                  isEmojiOnly(msg?.content)
                                    ? " text-[32px] leading-10 tracking-[-4px] "
                                    : /^\d+$/.test(msg?.content) // only numbers
                                    ? "break-all"
                                    : "break-words"
                                }`}
                              >
                                <HandleHyperLink
                                  text={msg?.content}
                                  mentions={msg?.mentions}
                                />
                              </div>
                            )}

                            {msg?.type !== "TEXT" && msg?.type !== "EMOJI" && (
                              <div>
                                {(() => {
                                  const images =
                                    msg?.attachments?.filter(
                                      (a) => a.type === "IMAGE"
                                    ) || [];
                                  const others =
                                    msg?.attachments?.filter(
                                      (a) => a.type !== "IMAGE"
                                    ) || [];

                                  return (
                                    <>
                                      {images.length > 0 && (
                                        <div
                                          className={`grid gap-2 font-montserrat ${
                                            images.length === 1
                                              ? "grid-cols-1"
                                              : images.length === 2
                                              ? "grid-cols-2"
                                              : "grid-cols-3"
                                          } max-w-[300px]`}
                                        >
                                          {images.slice(0, 3).map((img, i) => {
                                            const extra = images.length - 3;
                                            return (
                                              <div
                                                key={i}
                                                className="relative cursor-pointer"
                                                onClick={(e) => {
                                                  e.preventDefault();
                                                  e.stopPropagation();
                                                  const validSlides = images
                                                    .map((img) => img.url || "")
                                                    .filter((url) => url);
                                                  if (validSlides.length > 0) {
                                                    openLightbox(
                                                      i,
                                                      validSlides
                                                    );
                                                  } else {
                                                    console.error(
                                                      "No valid slides to display"
                                                    );
                                                  }
                                                }}
                                              >
                                                <Image
                                                  src={img.url || ""}
                                                  alt={img.fileName || "image"}
                                                  width={300}
                                                  height={300}
                                                  className="object-cover w-full h-32 rounded-md"
                                                />
                                                {i === 2 && extra > 0 && (
                                                  <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white rounded-md bg-black/50">
                                                    +{extra}
                                                  </div>
                                                )}
                                              </div>
                                            );
                                          })}
                                        </div>
                                      )}

                                      {/* Custom Lightbox */}
                                      {lightboxOpen &&
                                        lightboxSlides.length > 0 && (
                                          <div
                                            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80"
                                            onClick={closeLightbox}
                                            style={{ zIndex: 10000 }}
                                          >
                                            <div
                                              className="relative flex items-center justify-center w-full h-full p-4"
                                              onClick={(e) =>
                                                e.stopPropagation()
                                              } // Prevent closing when clicking inside
                                              ref={lightboxRef}
                                            >
                                              {/* Close Button */}
                                              <button
                                                onClick={closeLightbox}
                                                className="absolute top-4 right-4 text-white text-2xl font-bold bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 z-[10002]"
                                                style={{
                                                  zIndex: 10002,
                                                  color: "white",
                                                  backgroundColor: "black",
                                                  height: "40px",
                                                  width: "40px",
                                                }}
                                              >
                                                ×
                                              </button>

                                              {/* Navigation Buttons */}
                                              <button
                                                onClick={prevImage}
                                                className="absolute left-4 text-white md:text-4xl text-2xl font-bold bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 z-[10002]"
                                                style={{
                                                  zIndex: 10002,
                                                  color: "white",
                                                  backgroundColor: "black",
                                                  height: "40px",
                                                  width: "40px",
                                                }}
                                              >
                                                ‹
                                              </button>
                                              <button
                                                onClick={nextImage}
                                                className="absolute right-4 text-white md:text-4xl text-2xl font-bold bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 z-[10002]"
                                                style={{
                                                  zIndex: 10002,
                                                  color: "white",
                                                  backgroundColor: "black",
                                                  height: "40px",
                                                  width: "40px",
                                                }}
                                              >
                                                ›
                                              </button>
                                              <Image
                                                src={
                                                  lightboxSlides[lightboxIndex]
                                                }
                                                onLoadingComplete={() =>
                                                  setImageLoad(false)
                                                }
                                                fill
                                                alt={`Image ${
                                                  lightboxIndex + 1
                                                }`}
                                                className="object-contain max-w-full max-h-full cursor-zoom-in"
                                                style={{
                                                  transform: `scale(${lightboxZoom})`,
                                                  transition:
                                                    "transform 0.3s ease",
                                                }}
                                                onWheel={handleZoom}
                                              />
                                              {imageLoad && <ImageSkeleton />}
                                            </div>
                                          </div>
                                        )}

                                      {others.map((attachment, idx) => (
                                        <div key={idx} className="my-1">
                                          {attachment.type === "VIDEO" && (
                                            <video
                                              src={attachment.url}
                                              className="w-[350px] h-[200px] rounded-md"
                                              controls
                                            />
                                          )}
                                          {attachment.type === "AUDIO" && (
                                            <audio
                                              src={attachment.url}
                                              className="w-8 h-8 rounded-full"
                                              controls
                                            />
                                          )}
                                          {attachment.type === "DOCUMENT" && (
                                            <Link
                                              target="_blank"
                                              href={attachment.url}
                                              className="flex items-center gap-2 px-4 py-2 text-white break-words bg-gray-800 rounded-md"
                                            >
                                              <FileIcon className="w-8 h-8 bg-white" />
                                              <span
                                                className=" max-w-[200px] line-clamp-1"
                                                style={{ color: "white" }}
                                              >
                                                {attachment.fileName}
                                              </span>
                                            </Link>
                                          )}
                                        </div>
                                      ))}

                                      <div className="flex-1 text-center">
                                        {msg?.content && (
                                          <div
                                            className={` whitespace-pre-line flex-1 ${
                                              msg?.type === "SYSTEM"
                                                ? "text-center flex-1 text-gray-600"
                                                : "mt-2"
                                            }`}
                                          >
                                            <div className="">
                                              {msg?.metadata?.joinedUserId ==
                                              userInfo?.user?.id ? (
                                                <p className="text-[13px] font-medium">
                                                  Welcome! You’ve been added to
                                                  this conversation
                                                </p>
                                              ) : (
                                                <HandleHyperLink
                                                  text={msg?.content}
                                                  mentions={msg?.mentions}
                                                />
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            )}

                            {hovered === msg?.id && (
                              <MessageOptions
                                msg={msg}
                                isSender={isSender(msg?.sender?.id)}
                              />
                            )}
                          </div>
                        )}

                        {/* {user_loading && isSender(msg?.sender?.id) && (
                        <Image
                          src={msg?.sender?.avatar}
                          alt="avatar"
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full"
                        />
                      )} */}
                      </div>
                    </>
                  );
                })}
            </div>

            {/* <UnlockChapter color={"#fff"} />
            <UnlockChapterModal color={"#fff"} />
            <FirstVerifiedCard /> */}

            {/* <div
              className={`flex justify-center fixed bottom-16 md:bottom-40 xl:bottom-32 left-[33%] md:left-[60%] ${
                isNewMsg ? "block" : "hidden"
              } `}
            >
              <button
                onClick={handleNewMsg}
                className="p-3 text-white bg-black rounded-2xl"
              >
                New Message
              </button>
            </div> */}
          </div>
        ) : activeIndex === "" ? (
          <AllFiles conversationId={conversationId} />
        ) : (
          <AllImages conversationId={conversationId} />
        )}
        {chapterVerification?.data &&
          !chapterVerification?.data?.verification?.defaultMessageId &&
          chapterVerification?.data?.verification?.status === "PENDING" &&
          chapterVerification?.data?.verification?.workflowStage ===
            "WAITING_INTRO" &&
          !chapterVerification?.data?.verification?.isFirstMember && (
            <div className="">
              <UnlockChapter
                color={`#${orgColor?.color}`}
                verificationId={verificationId}
              />
            </div>
          )}
      </>
    </div>
  );
}
