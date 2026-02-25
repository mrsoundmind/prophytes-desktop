import Image from "next/image";
import { useGetMemberByIdQuery } from "@/src/redux/services/memberApi";
import ChatCloseBtn from "./ChatCloseBtn";

export default function NewChat({ id, bg, isShow = false }) {
  const recieverId = id?.split("-")[2];

  const { data: reciever, isLoading } = useGetMemberByIdQuery(recieverId);

  const handleClick = (conversationId) => {
    router.push(`/chat/${conversationId}`);
    if (isMobile) {
      dispatch(setShowChatFriendList(!showChatFriendList));
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center gap-3">
          {/* Avatar skeleton */}
          <div>
            <div className="relative flex items-center justify-center sm:w-[50px] xs:w-8 w-7 sm:h-[50px] xs:h-8 h-7 overflow-hidden border-2 border-white rounded-full">
              <div className="w-full h-full bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Name skeleton */}
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded-md w-28 sm:w-40 animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div
          className={`flex items-center   rounded-lg cursor-pointer relative group ${
            isShow
              ? "hover:bg-[#1a1a1a] px-3 sm:mt-[5px] mt-[13px] py-[8px]"
              : ""
          } ${bg ? "bg-transparent" : "bg-[#1a1a1a]"}`}
          onClick={() => handleClick(recieverId)}
        >
          <div className="relative flex items-center justify-center overflow-hidden border-2 border-white rounded-full w-9 h-9 sm:w-11 sm:h-11 ">
            <Image
              src={reciever?.data?.avatar || "/default-avatar.png"}
              alt={reciever?.data?.fullName}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="ml-3">
            <h4 className="2xl:text-lg text-[15px] font-bold text-white leading-[30px] line-clamp-1">
              {reciever?.data?.fullName}
            </h4>
          </div>
          {isShow && <ChatCloseBtn />}
        </div>
      )}
    </>
  );
}
