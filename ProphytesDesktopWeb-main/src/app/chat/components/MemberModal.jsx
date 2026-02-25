"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PeopleSvg from "@/public/img/icon/PeopleSvg";
import ViaLink from "@/public/img/icon/viaLink";
import { usePathname, useRouter } from "next/navigation";

import { SuccessAlert } from "@/src/utils/SuccessAlert";

import { useLazyGetConnectionStatusQuery } from "@/src/redux/services/connectionApi";
import { useLazyConversationByRecieverQuery } from "@/src/redux/services/conversationApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import AddPeopleModal from "./AddPeopleModal";

const MemberModal = ({ open, setOpen, conversation }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isUserPremium, setIsPremium] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showUerModal, setShowUserModal] = useState(false);
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const modalRef = useRef(null);
  const [
    fetchConnection,
    { data: memberConnection, isLoading: memberConnectionLoading },
  ] = useLazyGetConnectionStatusQuery();
  const pathname = usePathname();

  const [fetchConversation, { data, isLoading: loading }] =
    useLazyConversationByRecieverQuery();

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const router = useRouter();

  const handleNavigate = async (userId) => {
    const conversations = await fetchConversation({ recieverId: userId });
    const connection = await fetchConnection(userId);

    if (conversations?.data?.data?.conversation?.id) {
      return router.push(
        `/chat/${conversations?.data?.data?.conversation?.id}`
      );
    } else {
      if (isUserPremium) {
        router.push(`/chat/newchat-${userInfo?.user?.id}-${userId}`);
      } else {
        if (connection?.data?.data?.connection?.status === "connect") {
          router.push(`/chat/newchat-${userInfo?.user?.id}-${userId}`);
        } else {
          ErrorAlert("You are not connected to this member");
        }
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    SuccessAlert("Link copied to clipboard");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (userInfo?.user?.isPaid) {
      setIsPremium(true);
    }
  }, [userInfo]);

  // owner
  const ownerId = conversation?.participants?.find((p) => p?.role === "OWNER");
  const owner = ownerId?.id == userInfo?.user?.id;

  return (
    <div className="absolute right-0 top-10 ">
      <div className="relative z-[1001]">
        {open && (
          <div
            ref={modalRef}
            className="flex flex-col bg-[#272727] shadow-lg w-80 rounded-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 ">
              <p className="text-sm font-normal text-white/70">
                {conversation?.type === "GROUP" ? (
                  <span>People ({conversation?.participants?.length})</span>
                ) : (
                  <span>People ({conversation?.participants?.length})</span>
                )}
              </p>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Scrollable user list */}
            <div className="overflow-y-auto max-h-[200px] overflow-x-hidden">
              {conversation?.participants?.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="px-4 py-3 overflow-x-hidden transition-all duration-500 ease-in-out cursor-pointer hover:bg-gray-700"
                    onClick={() => handleNavigate(user.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="w-9 h-9 ">
                            <Image
                              src={user?.avatar}
                              height={36}
                              width={36}
                              alt={user?.firstName}
                              className="w-full h-full rounded-full"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-white w-[120px] font-normal leading-5 truncate line-clamp-1">
                          {user?.fullName}
                        </p>
                      </div>
                      <p className="text-[12px] text-white">
                        {user?.status == "PENDING" && "Pending"}
                      </p>
                      {"isVerified" in user && (
                        <p className="text-[12px] text-white">
                          {user.isVerified ? "" : "(Unverified)"}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sticky footer options */}
            <div className="sticky bottom-0 bg-[#272727] rounded-xl">
              <button
                className="flex items-center w-full gap-[14px] px-4 py-4 text-sm font-normal hover:bg-gray-700 text-white/20 cursor-not-allowed  transition-all duration-500 ease-in-out "
                // onClick={() => setShowModal(true)}
              >
                <ViaLink className="text-white/20" /> Invite via link
              </button>
              {conversation?.type == "GROUP" && owner && (
                <button
                  className="flex items-center w-full gap-[14px] px-4 py-4 text-sm font-normal hover:bg-gray-700 transition-all duration-500 ease-in-out"
                  onClick={() => setShowUserModal(true)}
                >
                  <PeopleSvg /> Add people
                </button>
              )}
            </div>
          </div>
        )}
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

              <h3 className="mb-1 text-lg font-semibold text-black">
                Invite to Prophytes
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                Invite link on Prophytes
              </p>

              <p className="p-2 mb-4 text-sm break-words bg-gray-100 border rounded-md">
                {origin + pathname}
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
        <>
          {showUerModal && (
            <AddPeopleModal
              showUerModal={showUerModal}
              setShowUserModal={setShowUserModal}
              conversation={conversation}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default MemberModal;
