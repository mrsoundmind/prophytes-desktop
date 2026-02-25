"use client";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Chatting from "../components/Chatting";

const Chat = () => {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();

  if (id === "request" || id === "new") {
    router.push(`/chat/${id}`);
  }

  return (
    <div className="bg-[#141616] rounded-[10px]">
      <div className="shadow-lg sm:px-[30px]  2xl:h-screen xl:h-[83vh] h-[100%]">
        <div className="pt-0 sm:pt-2">
          <Suspense fallback={<div>Loading...</div>}>
            <Chatting id={id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Chat;
