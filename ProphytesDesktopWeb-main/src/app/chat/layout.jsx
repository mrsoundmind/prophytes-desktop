"use client";
import React, { Suspense, useEffect } from "react";
import ChatSideBar from "./components/ChatSideBar";
import ChatHeader from "@/components/header/ChatHeader";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const showChatFriendList = useSelector(
    (state) => state.chat.showChatFriendList
  );

  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    if (userStatus) {
      window.location.reload();
    }
  }, [userStatus]);

  return (
    <main className="flex flex-col overflow-hidden h-dvh">
      {/* Header */}
      <ChatHeader width="6000px" />

      {/* Content */}
      <div className="flex-1 overflow-hidden bg-black">
        <div className="h-full mt-0 overflow-hidden md:px-6 3xl:px-20 2xl:px-10">
          <div className="bg-transparent shadow-lg sm:mt-0 mt-4 rounded-[12px] h-full overflow-hidden">
            <div className="gap-0 sm:flex sm:gap-6">
              {/* Sidebar */}
              <div
                className={`3xl:w-[30%] 4xl:w-[30%] md:w-[34%] bg-black/15
                ${showChatFriendList ? "block" : "hidden"} sm:block`}
              >
                <Suspense fallback={<p>Loading request...</p>}>
                  <ChatSideBar />
                </Suspense>
              </div>

              {/* Chat Window */}
              <div
                className={`3xl:w-[70%] 4xl:w-[70%] md:w-[64%] flex-1 mx-auto overflow-y-hidden
  ${showChatFriendList ? "hidden" : "block"} md:block`}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
