import EditSvg from "@/public/img/icon/EditSvg";
import InviteSvg from "@/public/img/icon/InviteSvg";
import UserSvg from "@/public/img/icon/UserSvg";
import {
  setActive,
  setEditModalOpen,
  setFriendModalOpen,
} from "@/src/redux/slices/chatOptionSlice";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const CreatedGroupOption = ({ users, textColor, iconColor }) => {
  const { editModalOpen, friendModalOpen, active } = useSelector(
    (state) => state.chatOption
  );
  const dispatch = useDispatch();

  return (
    <div className=" sm:mt-0">
      {users.length > 0 && (
        <div
          className={`flex flex-col items-center  bg- rounded-xl`}
          style={{ color: textColor }}
        >
          <div className="flex flex-col items-center">
            <div className="relative flex -space-x-4">
              {users.map((user, idx) => (
                <img
                  key={idx}
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="border-2 border-black rounded-full"
                />
              ))}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
            </div>

            <h5 className="mt-3 text-base font-semibold font-montserrat">
              {users.map((u) => u.name).join(", ")}
            </h5>

            <p className="text-sm" style={{ color: textColor }}>
              You created this group
            </p>

            <div className="flex items-center gap-[18px] mt-4">
              <div className="flex flex-col items-center text-[12px] font-semibold font-montserrat">
                <button
                  className={`grid place-content-center  size-[30px] rounded-[2.5px] mb-[10px] shadow-md ${
                    active === "invite" ? "bg-white" : ""
                  }`}
                  style={{ border: `1px solid ${textColor}` }}
                  onClick={() => dispatch(setActive("invite"))}
                >
                  <InviteSvg
                    style={{
                      color: active === "invite" ? iconColor : "",
                    }}
                  />
                </button>
                Invite
              </div>
              <div className="flex flex-col items-center text-[12px] font-semibold font-montserrat">
                <button
                  className={`grid place-content-center   size-[30px] rounded-[2.5px] mb-[10px] shadow-md `}
                  style={{
                    border: `1px solid ${textColor}`,
                    backgroundColor:
                      active === "add" ? textColor : "transparent",
                  }}
                  onClick={() => (
                    dispatch(setFriendModalOpen(true)),
                    dispatch(setEditModalOpen(false)),
                    dispatch(setActive("add"))
                  )}
                >
                  <UserSvg
                    style={{
                      color: active === "add" ? iconColor : "",
                    }}
                  />
                </button>
                Add
              </div>
              <div className="flex flex-col items-center text-[12px] font-semibold font-montserrat">
                <button
                  className={`grid place-content-center  size-[30px] rounded-[2.5px] mb-[10px] shadow-md ${
                    active === "edit" ? "bg-white" : ""
                  }`}
                  style={{ border: `1px solid ${textColor}` }}
                  onClick={() => (
                    dispatch(setEditModalOpen(true)),
                    dispatch(setActive("edit")),
                    dispatch(setFriendModalOpen(false))
                  )}
                >
                  <EditSvg
                    style={{
                      color: active === "edit" ? iconColor : "",
                    }}
                  />
                </button>
                Edit
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatedGroupOption;
