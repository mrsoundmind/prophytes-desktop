"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import {
  useGroupInvitationQuery,
  useInviteGroupConversationMutation,
} from "@/src/redux/services/conversationApi";
import { useParams } from "next/navigation";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
export default function AddPeopleModal({
  showUerModal,
  setShowUserModal,
  conversation,
}) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedfriend, setSelectedFriend] = useState(null);
  const [inviteUser, inviteUserRes] = useInviteGroupConversationMutation();
  const { id } = useParams();
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const { debouncedFilters: friendFilters, setFilter: setFriendFilter } =
    useDebouncedQuery();
  useEffect(() => {
    setSelectedFriend(null);
  }, []);

  useEffect(() => {
    setFriendFilter("search", inputValue);
  }, [inputValue]);

  const {
    data: connections,
    isLoading,
    isFetching,
    error,
  } = useGroupInvitationQuery({
    skip: 0,
    limit: 20,
    conversationId: id,
    name: friendFilters.search,
  });
  // console.log(connections.data.inviteList);

  const handleClear = () => {
    setSelectedFriend(null);
    setInputValue("");
    inputRef.current?.focus();
  };

  const toggleSelect = (user) => {
    if (selected.find((u) => u.id === user.id)) {
      setSelected(selected.filter((u) => u.id !== user.id));
    } else {
      setSelected([...selected, user]);
    }
  };

  const handleInvite = () => {
    const invitedUserIds = selected.map((u) => u.id);
    const data = {
      invitedUserIds,
      conversationId: id,
    };
    inviteUser(data);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowUserModal(false);
      }
    }

    if (showUerModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUerModal]);

  useEffect(() => {
    if (inviteUserRes?.isSuccess) {
      SuccessAlert("User invited successfully");
      setShowUserModal(false);
    }
    if (inviteUserRes?.error) {
      ErrorAlert(
        inviteUserRes?.error?.data?.message || "Failed to invite user"
      );
      setShowUserModal(false);
    }
  }, [inviteUserRes]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        // ref={modalRef}
        className="bg-[#242526] text-white sm:w-[550px] w-[300px] rounded-[16px] shadow-xl"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Add people</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setShowUserModal(!showUerModal)}
          >
            ✕
          </button>
        </div>

        <div className="relative p-3">
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onFocus={() => setDropdownOpen(true)}
            onChange={(e) => {
              setInputValue(e.target.value);
              setSelectedFriend(null);
            }}
            className="w-full px-3 py-2 rounded-md bg-[#3a3b3c] focus:outline-none placeholder:text-base text-base"
          />

          {inputValue && (
            <button
              onClick={handleClear}
              className="absolute text-white -translate-y-1/2 right-5 top-1/2 focus:outline-none"
              aria-label="Clear selection"
            >
              ✕
            </button>
          )}
        </div>

        <div className="px-5">
          {selected.length > 0 ? (
            <div className="flex gap-[18px] py-3 overflow-x-auto custom-scrollbar-x">
              {selected.map((user) => (
                <div key={user.id} className="flex flex-col items-center">
                  <div className="relative w-10 h-10">
                    <Image
                      src={user?.avatar}
                      alt={user?.fullName}
                      width={40}
                      height={40}
                      className="w-full h-full rounded-full "
                    />
                    <button
                      onClick={() => toggleSelect(user)}
                      className="absolute -top-1 -right-1 bg-[#3a3b3c] text-xs rounded-full px-[2px] "
                    >
                      ✕
                    </button>
                  </div>
                  <span className="mt-1 text-xs">
                    {user?.fullName?.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-[34px]">
              <p className="text-sm leading-4 text-center text-white">
                No users selected
              </p>
            </div>
          )}
        </div>

        <div className="overflow-y-auto sm:h-[320px] h-[290px] custom-scrollbar">
          <h3 className="px-3 my-2 text-xl font-bold text-white sm:my-4 sm:px-6">
            Suggested
          </h3>
          {isLoading || isFetching ? (
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-2 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-700 rounded-full h-9 w-9"></div>
                    <div className="w-32 h-4 bg-gray-700 rounded"></div>
                  </div>
                  <div className="inline-block w-4 h-4 border border-gray-600 rounded-full"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {connections?.data?.inviteList?.map((user, index) => (
                <div
                  key={index}
                  onClick={() => toggleSelect(user)}
                  className="flex items-center justify-between py-2 hover:bg-[#3a3b3c] cursor-pointer px-6"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={user?.avatar}
                      alt={user?.name}
                      width={36}
                      height={36}
                      className="rounded-full h-9 w-9"
                    />
                    <span> {user?.fullName}</span>
                  </div>
                  <div>
                    {selected.find((u) => u.id === user.id) ? (
                      <span className="text-white">✔</span>
                    ) : (
                      <span className="inline-block w-4 h-4 border border-gray-400 rounded-full"></span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700">
          <button
            onClick={() => handleInvite()}
            disabled={selected.length === 0 || isLoading || isFetching}
            className="w-full py-2 font-semibold bg-black rounded-md hover:bg-[#3a3b3c] transition-all duration-500 ease-in-out"
          >
            {inviteUserRes.isLoading ? "Adding..." : "Add people"}
          </button>
        </div>
      </div>
    </div>
  );
}
