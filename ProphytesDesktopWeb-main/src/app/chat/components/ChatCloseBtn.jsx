import { setgroupConversations } from "@/src/redux/slices/groupConversationsSlice";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const ChatCloseBtn = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div className="absolute right-2 top-3">
      <button
        className="relative z-[9999] hidden text-white transition-all duration-500 ease-in-out rounded-full group-hover:block bg-white/10 size-9"
        onClick={() => (
          dispatch(setgroupConversations([])), router.push("/chat")
        )}
      >
        x
      </button>
    </div>
  );
};

export default ChatCloseBtn;
