"use client";
import { useEffect, useRef, useState } from "react";
import CircleSvg from "@/public/img/icon/CircleSvg";
import LeftCircleSvg from "@/public/img/icon/LeftCircleSvg";

export default function ChatSettingModal({ openSetting, setOpenSetting }) {
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (openSetting) {
      setShowModal(true);
      setClosing(false);
    } else if (showModal) {
      setClosing(true);
      const timeout = setTimeout(() => {
        setShowModal(false);
        setClosing(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [openSetting]);

  useEffect(() => {
    if (!showModal) return;
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpenSetting(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal, setOpenSetting]);

  if (!showModal) return null;

  return (
    <div className="relative z-[999] sm:mt-0 -mt-20">
      <div
        ref={modalRef}
        className={`bg-white w-[320px] rounded-xl shadow-lg p-4 relative 
          ${closing ? "animate-slide-down" : "animate-slide-up"}
        `}
      >
        <h5 className="flex items-center gap-2 mb-4 text-base font-semibold text-black">
          <button onClick={() => setOpenSetting(false)}>
            <LeftCircleSvg />
          </button>{" "}
          Settings
        </h5>

        <ul className="space-y-3 sm:space-y-4">
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Edit group <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Edit profile <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Enable sharing <CircleSvg />
          </li>

          <div>
            <h5 className="flex items-center gap-2 mb-2 text-base font-semibold text-black">
              Share group
            </h5>
            <p className="text-sm text-[#333333] leading-[22px]">
              Anyone with this link will be able to join your group and see its
              title and avatar.
            </p>
          </div>

          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            <span>
              Pending requests
              <span className="text-base font-semibold text-[#1A73E8] ml-2">
                0
              </span>
            </span>
            <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Privacy <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Who can join? <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            <span>
              Visibility <span className="text-[10px]">Hidden</span>
            </span>
            <CircleSvg />
          </li>
          <p className="text-sm text-[#333333] leading-[22px] -mt-4">
            Manage who can find the group & how they can join.
          </p>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            <span>
              Permission <span className="text-[10px]">Everyone</span>
            </span>
            <CircleSvg />
          </li>
          <p className="text-sm text-[#333333] leading-[22px] -mt-4">
            Who has permission to edit group settings and manage roster
          </p>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Messages <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            <span>
              Delete message{" "}
              <span className="text-[10px]">Admins & authors</span>
            </span>
            <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Change owner <CircleSvg />
          </li>
          <li className="flex items-center justify-between text-[15px] font-medium text-black cursor-pointer font-montserrat">
            Report a concern <CircleSvg />
          </li>

          <h5 className="flex items-center gap-2 mb-2 text-base font-semibold text-red-500">
            End group
          </h5>
        </ul>
      </div>
    </div>
  );
}
