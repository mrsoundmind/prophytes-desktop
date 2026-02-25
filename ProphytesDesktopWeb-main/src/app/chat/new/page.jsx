"use client";
import React from "react";
import MakeGroup from "../components/NewConversation";

const Chat = () => {
  return (
    <div className="bg-[#272727] rounded-[20px]  shadow-lg 2xl:h-screen xl:h-[520px] h-screen">
      <MakeGroup />
    </div>
  );
};

export default Chat;
