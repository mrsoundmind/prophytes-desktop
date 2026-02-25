"use client";
import { Suspense, useEffect } from "react";
import RequestLayout from "../components/RequestLayout";
import { useConversationRequestsQuery } from "@/src/redux/services/conversationApi";
import { useRouter } from "next/navigation";

export default function page() {
  const { data: conversations, refetch } = useConversationRequestsQuery({});
  const router = useRouter();
  const handleNavigate = () => {
    if (conversations?.data?.conversations?.length > 0) {
      router.push(
        `/chat/request?conversationId=${conversations?.data?.conversations[0]?.id}&type=${conversations?.data?.conversations[0]?.type}`
      );
    }
  };

  useEffect(() => {
    if (conversations?.data?.conversations?.length > 0) {
      handleNavigate();
    }
  }, [conversations]);

  return (
    <div className=" bg-[#141616] rounded-[12px]">
      <div className="  shadow-lg  2xl:h-screen xl:h-[82vh] h-[95vh]">
        <div className="pt-0 sm:pt-2">
          <Suspense fallback={<div>Loading...</div>}>
            <RequestLayout />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
