"use client";
import ConversationSkeleton from "@/components/skeleton/ConversationSkeleton";
import { organizations, orgLogos } from "@/src/configs/constants";
import { timeAgo } from "@/src/utils/timeAgo";
import Image from "next/image";
import GroupAvatar from "./GroupAvatar";
import { useEffect, useState } from "react";
import OrganizationSvg from "@/public/img/icon/OrganizationSvg";
import ChpterSvg from "@/public/img/icon/ChpterSvg";

const ConverstionContent = ({
  conversations,
  isReq,
  fn,
  id,
  isSender,
  loading,
  req_loading,
}) => {
  const [hasFetched, setHasFetched] = useState(false);
  const getMiniLogoById = (id) => {
    if (!id) return null;
    const org = organizations.find((item) => item.id === id);
    return org.miniLogo;
  };

  useEffect(() => {
    if (!loading && !req_loading) {
      setHasFetched(true);
    }
  }, [loading, req_loading]);

  return (
    <div>
      {loading || req_loading ? (
        <>
          {[...Array(11)].map((_, i) => (
            <ConversationSkeleton key={i} />
          ))}
        </>
      ) : (
        <>
          {conversations.length > 0 ? (
            <>
              {conversations.map((conversation) => {
                const sortName = conversation?.name
                  ?.split(" ")
                  ?.map((word) => word[0])
                  ?.join("")
                  ?.toUpperCase();
                const text = conversation?.lastMessage?.content;

                const cleanText = text?.includes("{")
                  ? text?.slice(0, text?.indexOf("{"))?.trim()
                  : text;
                return (
                  <div
                    key={conversation.id}
                    className={`flex  px-3 py-2 hover:bg-[#1a1a1a] transition-all duration-500 ease-in-out rounded-lg cursor-pointer mb-2  ${
                      conversation.id === id ? "bg-[#1a1a1a]" : "bg-transparent"
                    }`}
                    onClick={() => fn(conversation.id, conversation?.type)}
                  >
                    <div>
                      <div className="relative flex items-center justify-center w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full">
                        {conversation?.type === "DIRECT" ? (
                          <Image
                            alt={
                              conversation?.name ||
                              conversation?.participants?.[0]?.fullName ||
                              "avatar"
                            }
                            src={
                              conversation?.participants?.[0]?.avatar ||
                              "/default-avatar.png"
                            }
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        ) : (
                          <div>
                            {conversation.type === "ORGANIZATION" ? (
                              <Image
                                alt={
                                  conversation?.name ||
                                  conversation?.participants?.[0]?.fullName ||
                                  "avatar"
                                }
                                src={orgLogos[sortName]}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            ) : (
                              <div className="relative w-full h-full">
                                <GroupAvatar
                                  users={conversation?.participants}
                                  isDirect={true}
                                />
                              </div>
                            )}{" "}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1 ml-3 overflow-hidden">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="2xl:text-lg text-[15px] font-bold text-white leading-6 line-clamp-1 font-montserrat">
                          {conversation?.type === "DIRECT"
                            ? conversation?.participants?.[0]?.fullName
                            : conversation?.name ||
                              `${conversation?.participants?.[0]?.fullName}, ${
                                conversation?.participants?.[1]?.fullName || ""
                              } ${
                                conversation?.participants?.length > 2
                                  ? `& ${
                                      conversation?.participants?.length - 2
                                    } more`
                                  : ""
                              }`}
                        </h4>
                        <div>
                          {conversation?.type === "DIRECT" ? (
                            <Image
                              src={getMiniLogoById(
                                isReq
                                  ? conversation?.participants[0]
                                      ?.organizationId
                                  : conversation?.organizationId
                              )}
                              width={33}
                              height={16}
                              className="w-[33px] h-4 rounded-full"
                              alt="conversation?.organizationId"
                            />
                          ) : conversation?.type === "ORGANIZATION" ? (
                            <OrganizationSvg />
                          ) : conversation?.type === "CHAPTER" ? (
                            <ChpterSvg />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full overflow-x-hidden">
                        <p className="text-sm font-normal leading-5 text-white break-all line-clamp-1">
                          {isSender(conversation?.lastMessage?.senderId)
                            ? "You: "
                            : conversation?.lastMessage?.sender?.fullName
                            ? conversation.lastMessage.sender.fullName.split(
                                " "
                              )[0] + ": "
                            : ""}
                          {conversation?.lastMessage?.content
                            ? cleanText
                              ? cleanText
                              : "New verification requst"
                            : conversation?.lastMessage?.type === "EMOJI"
                            ? "sent an emoji"
                            : conversation?.lastMessage?.type === "IMAGE"
                            ? "sent an image"
                            : conversation?.lastMessage?.type === "VIDEO"
                            ? "sent a video"
                            : conversation?.lastMessage?.type === "FILE"
                            ? "sent a file"
                            : ""}
                        </p>

                        <div className="max-w-[100px]">
                          <p className="text-[12px] font-normal leading-5 text-white/70 truncate">
                            {isReq
                              ? timeAgo(conversation?.lastMessage?.updatedAt)
                              : timeAgo(conversation?.lastMessageAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className="h-full">
              {loading || req_loading ? (
                <p className="text-center text-white">Loading...</p>
              ) : hasFetched && conversations?.length === 0 ? (
                <h4 className="flex items-center justify-center h-full sm:mt-[28%] mt-[60%] text-xl font-semibold text-center text-white">
                  No Conversation Found!
                </h4>
              ) : null}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConverstionContent;
