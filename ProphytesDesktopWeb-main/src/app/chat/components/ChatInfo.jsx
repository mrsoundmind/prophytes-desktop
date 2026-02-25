"use client";
import React, { useState, useRef, useEffect } from "react";
import man from "@/public/img/home/man.jpg";
import Image from "next/image";
import MuteSvg from "@/public/img/icon/MuteSvg";
import SearchSvg from "@/public/img/icon/SearchSvg";
import AngleDown from "@/public/img/icon/AngleDown";

const ChatInfo = ({ showChatInfo, setShowChatInfo }) => {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);
  const [openSection, setOpenSection] = useState("");
  const modalRef = useRef(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  // Handle open/close animation state
  useEffect(() => {
    if (showChatInfo) {
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
  }, [showChatInfo]);

  // Close modal on outside click
  useEffect(() => {
    if (!showModal) return;
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowChatInfo(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal, setShowChatInfo]);

  if (!showModal) return null;

  return (
    <div className="z-[9999] relative mt-2">
      <div
        ref={modalRef}
        className={`relative p-4 bg-white shadow-lg w-80 rounded-[12px] 
          ${closing ? "animate-slide-down" : "animate-slide-up"}
        `}
      >
        <div className="flex flex-col items-center">
          <Image
            src={man}
            alt="Profile"
            width={60}
            height={60}
            className="rounded-full size-[60px]"
          />
          <h2 className="mt-2 text-base font-semibold text-black font-montserrat">
            Alpha
          </h2>
          <p className="text-sm font-normal text-black py-[9px]">
            You created this group
          </p>

          <div className="flex gap-6 mt-3">
            <div className="flex flex-col items-center text-sm font-semibold text-black hover:text-black">
              <div className="size-6 rounded-[2px] border grid place-items-center">
                <SearchSvg />
              </div>
              Search
            </div>
            <div className="flex flex-col items-center text-sm font-semibold text-black hover:text-black">
              <div className="size-6 rounded-[2px] border grid place-items-center">
                <MuteSvg />
              </div>
              Mute
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {[
            {
              id: "chatInfo",
              label: "Chat Info",
              content: "View pin messaged",
            },
            {
              id: "customize",
              label: "Customize Chat",
              content: "Change theme, color, etc.",
            },
            {
              id: "groupOption",
              label: "Group Option",
              content: "Manage group settings",
            },
            {
              id: "members",
              label: "Chat Members",
              content: "List of group members here",
            },
            {
              id: "media",
              label: "Media, file, links",
              content: "Show uploaded files",
            },
            {
              id: "privacy",
              label: "Privacy & Support",
              content: "Privacy settings, report support",
            },
          ].map((section) => (
            <div key={section.id} className="border rounded-lg">
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold font-montserrat"
                onClick={() => toggleSection(section.id)}
              >
                {section.label}
                <AngleDown className="text-white" />
              </button>
              {openSection === section.id && (
                <div className="px-4 py-2 text-[12px] font-medium text-black font-montserrat">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
