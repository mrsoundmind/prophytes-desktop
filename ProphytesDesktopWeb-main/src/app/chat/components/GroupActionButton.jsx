"use client";
import React, { useRef, useEffect, useState } from "react";
import EditSvg from "@/public/img/icon/EditSvg";
import InviteSvg from "@/public/img/icon/InviteSvg";
import UserSvg from "@/public/img/icon/UserSvg";
import { useDispatch, useSelector } from "react-redux";
import {
  setActive,
  setEditModalOpen,
  setFriendModalOpen,
} from "@/src/redux/slices/chatOptionSlice";

const GroupActionButton = ({
  selected,
  setSelected,
  groupName,
  setGroupName,
}) => {
  const modalRef = useRef(null);
  const [tempName, setTempName] = useState(groupName);
  const dispatch = useDispatch();
  const { active, editModalOpen, friendModalOpen } = useSelector(
    (state) => state.chatOption
  );

  useEffect(() => {
    if (editModalOpen) {
      setTempName(groupName);
    }
  }, [editModalOpen, groupName]);

  const isUserAdded = (user) => selected.some((u) => u.name === user.name);

  const addUser = (user) => {
    if (isUserAdded(user)) {
      setSelected(selected.filter((u) => u.name !== user.name));
    } else {
      setSelected([...selected, user]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        dispatch(setFriendModalOpen(false));
        dispatch(setActive(""));
      }
    };
    if (friendModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [friendModalOpen, dispatch]);

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex items-center gap-[18px] mt-4">
        {/* Invite */}
        <div className="text-[12px] font-semibold font-montserrat">
          <button
            className="grid place-content-center border border-white size-6 rounded-[2px] mb-[10px]"
            onClick={() => dispatch(setActive("invite"))}
          >
            <InviteSvg />
          </button>
          Invite
        </div>

        {/* Add User */}
        <div className="text-[12px] font-semibold font-montserrat">
          <button
            className={`grid place-content-center border border-white size-6 rounded-[2px] mb-[10px] ${
              active === "add" ? "bg-white" : "bg-transparent"
            }`}
            onClick={() => (
              dispatch(setFriendModalOpen(true)),
              dispatch(setEditModalOpen(false)),
              dispatch(setActive("add"))
            )}
          >
            <UserSvg
              className={`${active === "add" ? "text-black" : "text-white"}`}
            />
          </button>
          Add
        </div>

        {/* Edit */}
        <div className="text-[12px] font-semibold font-montserrat">
          <button
            className={`grid place-content-center border border-white size-6 rounded-[2px] mb-[10px] ${
              active === "edit" ? "bg-white" : "bg-transparent"
            }`}
            onClick={() => (
              dispatch(setEditModalOpen(true)),
              dispatch(setActive("edit")),
              dispatch(setFriendModalOpen(false))
            )}
          >
            <EditSvg
              className={`${active === "edit" ? "text-black" : "text-white"}`}
            />
          </button>
          Edit
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-[22px] sm:px-0 bg-black/50">
          <div className="rounded-xl shadow-lg sm:max-w-[550px] w-full">
            <div className="py-4 px-4 sm:px-[30px] flex items-center justify-between bg-[#141616] rounded-t-[10px]">
              <h2 className="text-xl font-bold text-white">Chat Name</h2>
              <button
                onClick={() => (
                  dispatch(setEditModalOpen(false)), dispatch(setActive(""))
                )}
                className="text-xl text-[#FF0000]"
              >
                ✕
              </button>
            </div>

            <div className="border rounded-b-[10px] bg-[#202020] border-transparent sm:px-[30px] px-4">
              <p className="my-5 text-sm text-white">
                Changing the name of a group chat changes it for everyone.
              </p>

              {/* Controlled temporary Input */}
              <div className="flex items-center">
                <input
                  type="text"
                  maxLength={200}
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="flex-1 py-3 px-4 rounded-l-[10px] outline-none bg-[#141616] text-white placeholder:text-base text-base"
                />
                <p className="py-[14px] text-sm text-gray-500 bg-[#141616] rounded-r-[10px] pr-4">
                  {tempName.length}/200
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-4 mb-5">
                <button
                  onClick={() => (
                    dispatch(setEditModalOpen(false)), dispatch(setActive(""))
                  )}
                  className="font-semibold text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setGroupName(tempName); // update parent state only on Save
                    dispatch(setEditModalOpen(false));
                    dispatch(setActive(""));
                  }}
                  className="px-4 py-1 font-semibold text-black bg-white rounded-full"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {friendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-[22px] sm:px-0 bg-black/50">
          <div
            ref={modalRef}
            className="p-4 overflow-y-auto bg-white shadow-lg rounded-xl sm:w-80 w-full max-h-[470px]"
          >
            {allUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 border-b last:border-none"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span className="text-gray-800">{user.name}</span>
                </div>
                <button
                  className={`text-xl font-bold ${
                    isUserAdded(user) ? "text-green-500" : "text-gray-500"
                  }`}
                  onClick={() => addUser(user)}
                >
                  {isUserAdded(user) ? "✓" : "+"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupActionButton;
