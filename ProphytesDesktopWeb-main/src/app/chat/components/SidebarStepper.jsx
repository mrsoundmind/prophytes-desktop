"use client";

import { useConversationRequestsQuery } from "@/src/redux/services/conversationApi";
import { useGetNotificationsQuery } from "@/src/redux/services/notificationApi";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarStepper({
  setConversationType,
  activeTab,
  setActiveTab,
  userId,
}) {
  const pathname = usePathname();
  const isReq = pathname === "/chat/request";
  const { data: conversations } = useConversationRequestsQuery({});
  const { data, error, isLoading, refetch } = useGetNotificationsQuery({
    userId,
    limit: 10,
    skip: 0,
    type: "CONNECTION_REQUEST",
    sort: "desc",
  });

  const handleTabClick = (label, type) => {
    setActiveTab(label);
    setConversationType(type);
  };

  return (
    <div className="flex justify-center gap-3 my-3 sm-mx-0 sm:my-4 sm:items-center">
      <div className="border-b border-[#E9EFF01A]/10 flex items-center 2xl:gap-10 sm:gap-3 gap-2">
        <button
          onClick={() => handleTabClick("All", null)}
          className={`relative pb-2 sm:text-base text-sm font-semibold font-montserrat leading-5    transition-all duration-300 ease-in-out border-b-[1.1px] overflow-hidden 
            ${isReq ? "px-6" : "px-3"}
  ${
    activeTab === "All"
      ? "text-white border-white"
      : "text-gray-400 border-transparent"
  }`}
        >
          All
        </button>

        {/* Group */}
        <button
          onClick={() => handleTabClick("Group", "GROUP")}
          className={`relative pb-2 sm:text-base text-sm font-semibold font-montserrat leading-5     transition-all duration-300 ease-in-out border-b-[1.1px] overflow-hidden  ${
            isReq ? "px-6" : "px-2"
          }
 ${
   activeTab === "Group"
     ? "text-white border-white"
     : "text-gray-400 border-transparent"
 }`}
        >
          Group
        </button>
        {/* Connects */}

        {!isReq && (
          <button
            onClick={() => handleTabClick("Chapter", "CHAPTER")}
            className={`relative pb-2 sm:text-base text-sm font-semibold font-montserrat leading-5 px-2   transition-all duration-300 ease-in-out border-b-[1.1px] overflow-hidden   ${
              activeTab === "Chapter"
                ? "text-white border-white"
                : "text-gray-400 border-transparent"
            }`}
          >
            Chapter
          </button>
        )}

        <button
          onClick={() => handleTabClick("Connects", "Connects")}
          className={`relative pb-2 sm:text-base text-sm font-semibold font-montserrat leading-5  transition-all duration-300 ease-in-out border-b-[1.1px] overflow-hidden ${
            isReq ? "px-6" : "px-2"
          }  ${
            activeTab === "Connects"
              ? "text-white border-white"
              : "text-gray-400 border-transparent"
          }`}
        >
          <span>
            {isReq && (
              <span>
                {data?.data?.notifications?.length > 0 &&
                  `(${data?.data?.notifications?.length})`}
              </span>
            )}{" "}
          </span>
          Connects
        </button>

        <button
          onClick={() => handleTabClick("request")}
          className={`relative sm:hidden block pb-2 sm:text-base text-sm font-semibold font-montserrat leading-5 px-2    transition-all duration-300 ease-in-out border-b-[1.1px] overflow-hidden 
 ${
   activeTab === "request"
     ? "text-white border-white"
     : "text-gray-400 border-transparent"
 }`}
        >
          <span>
            {conversations?.data?.conversations?.length > 0
              ? `(${conversations.data.conversations.length})`
              : null}
          </span>
          Requests
        </button>
      </div>
    </div>
  );
}
