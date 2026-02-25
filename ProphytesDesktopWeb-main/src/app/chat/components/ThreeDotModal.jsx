"use client";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";

import BookmarkSvg from "@/public/img/icon/BookmarkSvg";
import Chatbubble from "@/public/img/icon/Chatbubble";
import DeleteSvg from "@/public/img/icon/DeleteSvg";
import Edit from "@/public/img/icon/Edit";

import FindChatSvg from "@/public/img/icon/FindChatSvg";
import LeaveSvg from "@/public/img/icon/LeaveSvg";
import MettingSvg from "@/public/img/icon/MettingSvg";
import MonitorSvg from "@/public/img/icon/MonitorSvg";

import { useDispatch, useSelector } from "react-redux";
import {
  useClearHistoryMutation,
  useDeleteConversationMutation,
  useLazyChapterConversationByIdQuery,
  useLazyConversationByIdQuery,
  useLazyGroupConversationByIdQuery,
  useLazyOrgConversationByIdQuery,
  useLeaveGroupMutation,
  useUpdateGroupNameMutation,
} from "@/src/redux/services/conversationApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import {
  setIsMobile,
  setShowChatFriendList,
} from "@/src/redux/slices/chatSlice";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ChapterIconSvg from "@/public/img/icon/ChapterIconSvg";
import EditEducationModal from "../../(dashboardLayout)/components/EditEducationModal";

export default function ThreeDotModal({
  conversationId,
  dotModal,
  setDotModal,
}) {
  const type = useSearchParams().get("type");
  const modalRef = useRef(null);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState();
  const [open, setOpen] = useState(false);
  const [deleteGroup, deleteGroupRes] = useDeleteConversationMutation();

  const [fetchChapterConv, { data: chapterConversationRes }] =
    useLazyChapterConversationByIdQuery({
      conversationId,
    });
  const [leave, leaveRes] = useLeaveGroupMutation();

  const [updateGroupName, { isLoading: edit_loading, isSuccess, isError }] =
    useUpdateGroupNameMutation();

  const [clearHistory, { isLoading: clear_loading }] =
    useClearHistoryMutation();

  const { data: userInfo } = useUserInfoQuery();

  const { isMobile, showChatFriendList } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [fetchConversation, { data: conversation, isLoading }] =
    useLazyConversationByIdQuery();

  const [fetchGroupConversation, { data, isLoading: conversation_loading }] =
    useLazyGroupConversationByIdQuery();

  const [fetchOrgConv, { data: orgConv, isLoading: org_conv_loading }] =
    useLazyOrgConversationByIdQuery(
      { conversationId },
      {
        skip: !conversationId,
      }
    );

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDotModal(false);
      }
    }

    if (dotModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dotModal, setDotModal]);

  useEffect(() => {
    if (data?.data?.conversation?.name) {
      setGroupName(data?.data?.conversation?.name);
    } else {
      const names =
        data?.data?.conversation?.participants
          .slice(0, 3)
          ?.map((p) => p?.fullName?.split(" ")[0])
          .join(", ") || "";
      setGroupName(names);
    }
  }, [data?.data?.conversation]);

  useEffect(() => {
    if (!conversationId) return;
    if (type === "GROUP" && conversationId) {
      fetchGroupConversation({ id: conversationId });
    } else if (type === "CHAPTER" && conversationId) {
      fetchChapterConv({ conversationId });
    } else if (type === "ORGANIZATION" && conversationId) {
      fetchOrgConv({ conversationId });
    } else {
      fetchConversation({ conversationId });
      fetchGroupConversation({ id: conversationId });
    }
  }, [
    type,
    conversationId,
    fetchConversation,
    fetchGroupConversation,
    fetchChapterConv,
  ]);

  const ownerId = data?.data?.conversation?.participants.find(
    (p) => p?.role === "OWNER"
  );
  const owner = ownerId?.id == userInfo?.user?.id;

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#555",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (
            conversation?.data?.conversations?.type === "GROUP" ||
            data?.data?.conversation?.type === "GROUP" ||
            type === "GROUP"
          ) {
            await deleteGroup({ conversationId, type: "GROUP" }).unwrap();
          } else {
            await deleteGroup({ conversationId, type: "DIRECT" }).unwrap();
          }

          setDotModal(false);
          // router.push("/chat");
          window.location.href = "/chat";

          if (typeof window !== "undefined" && window.innerWidth <= 640) {
            dispatch(setShowChatFriendList(!showChatFriendList));
            dispatch(setIsMobile(!isMobile));
          }

          Swal.fire(
            "Deleted!",
            "Your conversation has been deleted.",
            "success"
          );
        } catch (err) {
          ErrorAlert(
            err?.data?.data?.issue?.message || "Failed to delete group"
          );
        }
      }
    });
  };

  // const handleClear = async (id) => {
  //   try {
  //     const res = await clearHistory({ id }).unwrap();
  //     console.log("Cleared successfully:", res);
  //   } catch (error) {
  //     // console.error("Failed to clear history:", error);
  //   }
  // };

  const handleClear = async (id) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        clearHistory({ id });
      }
    });
  };

  const handleLeave = async (conversationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        leave({ conversationId });
      }
    });
  };

  // const handleLeave = (conversationId) => {
  //   leave({ conversationId });
  // };

  useEffect(() => {
    if (leaveRes?.data) {
      router.push("/chat");
      if (typeof window !== "undefined" && window.innerWidth <= 640) {
        dispatch(setShowChatFriendList(!showChatFriendList));
        dispatch(setIsMobile(!isMobile));
      }
    }
    if (leaveRes?.error) {
      ErrorAlert(leaveRes?.error?.data?.message || "Failed to leave group");
    }
  }, [leaveRes]);

  const handleUpdate = async (name) => {
    try {
      await updateGroupName({ id, name }).unwrap();
      SuccessAlert("Group name updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      ErrorAlert(error?.data?.message || "Failed to update group name");
    }
  };

  // console.log(chapterConversationRes?.data?.conversation?.scope, "hello");

  return (
    <>
      {dotModal && (
        <div className="absolute right-0 top-20 z-[99]">
          <div
            ref={modalRef}
            className="bg-[#1e1e1e] text-gray-200 rounded-[16px] sm:w-[332px] w-[300px] p-3 shadow-lg"
          >
            <ul className="space-y-1">
              <li className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] text-sm leading-[22px] text-white/20 cursor-not-allowed hover:bg-gray-700 border-b border-[#383838]">
                <FindChatSvg className="text-white/20" />
                Find in chat
              </li>

              <li className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] hover:bg-gray-700 text-sm text-white/20 cursor-not-allowed leading-[22px] border-b border-[#383838]">
                <MettingSvg className="text-white/20" />
                Schedule meeting
              </li>
              {chapterConversationRes?.data?.conversation?.scope ==
                "DEFAULT" && (
                <li
                  className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] hover:bg-gray-700 text-sm text-white leading-[22px] border-b border-[#383838] cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <ChapterIconSvg className="text-white" />
                  Change chapter
                </li>
              )}

              <li className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] hover:bg-gray-700 text-sm leading-[22px] text-white/20 cursor-not-allowed border-b border-[#383838]">
                <MonitorSvg className="text-white/20" />
                Screensharing
              </li>
              <li className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] hover:bg-gray-700 text-sm leading-[22px] text-white/20 cursor-not-allowed border-b border-[#383838]">
                <BookmarkSvg className="text-white/20" />
                Saved
              </li>
              <li className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] hover:bg-gray-700 text-sm leading-[22px] text-white/20 cursor-not-allowed border-b border-[#383838]">
                <Chatbubble className="text-white/20" />
                Mute
              </li>
              {conversation?.data?.conversations?.status !== "PENDING" &&
                conversation?.data?.conversations?.type === "GROUP" && (
                  <button
                    onClick={() => handleLeave(conversationId)}
                    className="flex items-center w-full gap-[14px] px-4 sm:py-3 py-3 text-sm font-normal text-white hover:bg-gray-700 transition-all duration-500 ease-in-out border-b border-[#383838]"
                  >
                    <LeaveSvg />{" "}
                    {leaveRes.isLoading ? "Leaving..." : "Leave group"}
                  </button>
                )}

              {conversation?.data?.conversations?.type === "GROUP" && owner && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center w-full gap-[14px] px-4 sm:py-3 py-3 text-sm font-normal text-white hover:bg-gray-700  transition-all duration-500 ease-in-out border-b border-[#383838]"
                >
                  <Edit />
                  Edit group name
                </button>
              )}
              {conversation?.data?.conversations?.type === "DIRECT" && (
                <button
                  onClick={() =>
                    handleClear(conversation?.data?.conversations?.id)
                  }
                  className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] text-white hover:bg-gray-700 text-sm leading-[22px] w-full"
                >
                  <DeleteSvg />
                  {clear_loading ? "processing..." : "Clear history"}
                </button>
              )}

              {(owner ||
                conversation?.data?.conversations?.type === "DIRECT") && (
                <button
                  onClick={() => handleDelete()}
                  className="flex items-center gap-3 px-3 sm:py-3 xs:py-2 py-[6px] text-white hover:bg-gray-700 text-sm leading-[22px] w-full"
                >
                  <DeleteSvg />
                  {deleteGroupRes.isLoading ? "Deleting..." : "Delete"}
                </button>
              )}
            </ul>

            {/* <button
              onClick={() => setDotModal(false)}
              className="w-full py-2 mt-2 text-gray-300 [6px]g-gray-800 rounded-lg mt-xs:3 te py-1xt-sm sm:py-3 bg-gray-700"
            >
              Close
            </button> */}
          </div>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-[#202020] rounded-[12px] shadow-lg sm:w-[400px] xs:w-[300px] w-[280px]  border border-[#383838]">
            <h4 className="mb-4 text-sm font-semibold leading-6 text-white sm:text-base">
              Groupe Name
            </h4>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-4 sm:py-3 xs:py-2 py-[6px] mb-4 text-white/80 sm:text-base text-sm font-normal font-montserrat leading-6 rounded-[8px] bg-black border border-gray-700 focus:outline-none placeholder:sm:text-base placeholder:text-sm"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-8 sm:py-3 xs:py-2 py-[6px] text-white bg-transparent rounded-[8px] border border-[#383838]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdate(groupName)}
                className="px-8 sm:py-3 xs:py-2 py-[6px] text-black bg-white rounded-[8px] hover:bg-gray-200"
              >
                {edit_loading ? "Saveing.." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      <EditEducationModal setOpen={setOpen} open={open} />
    </>
  );
}
