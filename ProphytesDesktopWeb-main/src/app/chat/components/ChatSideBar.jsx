"use client";
import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import ChatSearch from "@/public/img/icon/ChatSearch";
import {
  useParams,
  useRouter,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import ChatSidebarIcon from "./ChatSidebarIcon";

import SidebarStepper from "./SidebarStepper";
import FriendSvg from "@/public/img/icon/FriendSvg";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import FriendsConversation from "./FriendsConversation";
import BottomNav from "@/components/header/BottomNav";
import ConverstionContent from "./ConverstionContent";
import { useLazyConversationRequestsQuery } from "@/src/redux/services/conversationApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import ChatTopHeader from "./ChatTopHeader";

const ChatSideBar = () => {
  const [conversationType, setConversationType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [profileLink, setProfileLink] = useState("");
  const newConversationReq = useSelector(
    (state) => state.conversation.newConversation
  );

  const { id } = useParams();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("conversationId");

  const router = useRouter();
  const pathname = usePathname();

  const [fetchConversationReq, reqConversationRes] =
    useLazyConversationRequestsQuery();
  const { data: user } = useUserInfoQuery();
  const { data: userInfo, isLoading: loading } = useUserInfoQuery();
  const userId = userInfo?.user?.id;
  const dispatch = useDispatch();
  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);

  const newReq = pathname === "/chat/request";

  // console.log(reqConversationRes.data.data.conversations);

  let type;
  if (activeTab == "Group") {
    type = activeTab?.toUpperCase();
  } else if (activeTab == "Chapter") {
    type = activeTab?.toUpperCase();
  } else {
    type = "";
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(profileLink);
    SuccessAlert("Link copied to clipboard");
  };

  const isSender = (senderId) => senderId === user?.user?.id;

  const handleClick = (conversationId, type) => {
    const url = `/chat/request?conversationId=${conversationId}&type=${type}`;
    router.push(url);
    if (isMobile) dispatch(setShowChatFriendList(!showChatFriendList));
  };
  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 640));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  useEffect(() => {
    fetchConversationReq({ name, type });
  }, [name, type]);

  useEffect(() => {
    if (typeof window !== "undefined" && userInfo?.user?.id) {
      setProfileLink(`${window.location.origin}/members/${userInfo.user.id}`);
    }
  }, [userInfo]);

  useEffect(() => {
    if (newConversationReq) {
      fetchConversationReq({ name, type });
    }
  }, [newConversationReq]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setName(searchName);
  };

  if (!showChatFriendList && isMobile) return null;

  return (
    <div className="xl:flex ">
      <ChatSidebarIcon />

      <div className="bg-black rounded-[10px]  shadow-lg w-full overflow-hidden 2xl:h-screen xl:h-[520px] sm:pt-6 pt-2 ">
        {/* border-b-2 border-gray-600  */}
        <ChatTopHeader />

        <div className="mx-3 my-4 sm:mx-0">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search friends & groups...."
              className={`w-full px-6 py-4 rounded-[12px] text-[#E9EFF099]/60 bg-white/10 placeholder:text-white text-base placeholder:text-base placeholder:leading-5 placeholder:text-[#E9EFF099]/60 font-normal focus:outline-none font-inter`}
            />
            <button
              type="submit"
              className="absolute -translate-y-1/2 right-4 top-1/2"
            >
              <ChatSearch className="text-white" />
            </button>
          </form>
        </div>

        <div className="">
          <SidebarStepper
            conversationType={conversationType}
            setConversationType={setConversationType}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userId={userId}
          />

          <div className="mt-1 overflow-hidden h-[calc(100vh-56vh)] xxs:h-[calc(100vh-43vh)] xs:h-[calc(100vh-38vh)]  xss:h-[calc(100vh-40vh)] sm:h-[calc(100vh-150px)] md:h-[calc(100vh-190px)] lg:h-[calc(100vh-200px)] xl:h-[calc(100vh-355px)] 2xl:h-[calc(100vh-360px)] 3xl:h-[calc(100vh-365px)]  custom-scrollbar  overflow-y-auto ">
            <>
              {activeTab === "Connects" ? (
                <FriendsConversation
                  name={name}
                  pathname={pathname}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              ) : activeTab === "request" ? (
                <div>
                  {reqConversationRes?.data?.data?.conversations.length > 0 ? (
                    <ConverstionContent
                      conversations={
                        reqConversationRes?.data?.data?.conversations
                      }
                      isReq={true}
                      fn={handleClick}
                      id={id}
                      isSender={isSender}
                      req_loading={reqConversationRes?.isLoading}
                    />
                  ) : (
                    <div className="mt-[60%]">
                      <p className="text-xl font-bold text-center text-white ">
                        No Request Found!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Conversation
                  id={newReq ? conversationId : id}
                  conversationType={newReq ? type : conversationType}
                  name={name}
                  type={newReq && type}
                />
              )}
            </>
          </div>
          <div className="hidden sm:block">
            {/* Invite Button */}
            <button
              className="py-3 bg-[#272727] w-full rounded-full text-white font-medium leading-6 text-base flex items-center justify-center gap-2 font-montserrat"
              onClick={() => setShowModal(true)}
            >
              <FriendSvg /> Invite to Prophytes
            </button>

            {/* Modal */}
            {showModal && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out bg-black bg-opacity-50"
                onClick={() => setShowModal(false)}
              >
                <div
                  className={`relative p-5 bg-white shadow-lg rounded-xl w-80 transform transition-all duration-500 ease-in-out
                  ${showModal ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute text-gray-500 top-3 right-3"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>

                  <h3 className="mb-1 text-lg font-semibold">
                    Invite to Prophytes
                  </h3>
                  <p className="mb-4 text-sm text-gray-500">
                    Invite link on Prophytes
                  </p>

                  <p className="p-2 mb-4 text-sm break-words bg-gray-100 border rounded-md">
                    {profileLink}
                  </p>

                  <button
                    className="flex items-center justify-center w-full py-4 font-medium text-white bg-black rounded-full"
                    onClick={handleCopy}
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="fixed bottom-0 left-0 z-50 block w-full sm:hidden">
            <BottomNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
