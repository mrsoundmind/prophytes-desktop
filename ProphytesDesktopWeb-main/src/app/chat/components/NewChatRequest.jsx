import { useEffect } from "react";
import {
  useAcceptConversationMutation,
  useDeclineConversationMutation,
} from "@/src/redux/services/conversationApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useRouter } from "next/navigation";
import GroupAvatar from "./GroupAvatar";

const NewChatRequest = ({
  name,
  avatar,
  conversationId,
  type,
  sender,
  isLoading,
}) => {
  const [accept, acceptRes] = useAcceptConversationMutation();
  const [decline, declineRes] = useDeclineConversationMutation();
  const router = useRouter();

  if (isLoading) {
    return null;
  }

  useEffect(() => {
    if (acceptRes.data) {
      SuccessAlert("Conversation accepted");
      router.push(`/chat/${conversationId}`);
    }
    if (acceptRes.error) {
      ErrorAlert(
        acceptRes.error.data.message || "Failed to accept conversation"
      );
    }
  }, [acceptRes]);

  useEffect(() => {
    if (declineRes.data) {
      SuccessAlert("Conversation declined");
      router.push("/chat/request");
    }
    if (declineRes.error) {
      ErrorAlert(
        declineRes.error.data.message || "Failed to decline conversation"
      );
    }
  }, [declineRes]);
  return (
    <div className="lg:py-8 lg:px-8 py-4  bg-[#E6E6E6] rounded-[10px] shadow-lg w-fit block m-auto">
      <div>
        <div className="flex items-center justify-center">
          <GroupAvatar users={avatar?.participants} isDirect={true} />
        </div>
        <div className="space-y-2 sm:space-y-5">
          <div className="flex items-center justify-center gap-1 mt-1">
            <h5 className="sm:text-[22px] text-lg text-black font-bold  leading-[30px] font-montserrat ">
              {name}
            </h5>
          </div>
          <div className="space-y-2 sm:space-y-5">
            <p className="text-base text-center font-normal leading-5 text-black max-w-[362px] block m-auto">
              {type === "DIRECT" ? (
                <p>
                  Do you want <span className="font-bold">{sender}</span> to
                  message you? They won’t know you have seen their message until
                  you accept it
                </p>
              ) : (
                <p>
                  You have been invited to join this group by{" "}
                  <span className="font-bold"> {sender}</span>. You’ll be able
                  to chat with other members once you accept the invitation.
                </p>
              )}
            </p>
            <div className="flex items-center justify-center gap-5">
              <button
                disabled={acceptRes.isLoading || declineRes.isLoading}
                onClick={() => decline({ conversationId, type })}
                className="sm:text-base text-sm font-bold leading-5 sm:py-[15px] py-[11px] px-[25px] border border-black rounded-full"
              >
                {declineRes.isLoading ? "Declining..." : "Decline"}
              </button>
              <button
                disabled={acceptRes.isLoading || declineRes.isLoading}
                onClick={() => accept({ conversationId, type })}
                className="sm:text-base text-sm font-bold bg-black text-white leading-5 sm:py-[15px] py-[11px] px-[25px] border border-black rounded-full"
              >
                {acceptRes.isLoading ? "Accepting..." : "Accept"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatRequest;
