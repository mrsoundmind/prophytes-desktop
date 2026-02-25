"use client";
import { useState, useRef, useEffect } from "react";
import CarotSvg from "@/public/img/icon/CarotSvg";

const UniversityDropdown = ({ universities }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(universities[0]?.name);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative w-full">
        <div
          onClick={() => setOpen(!open)}
          className="w-[190px] overflow-hidden text-[#B2B2B2] group-hover:text-black pr-8 rounded-lg cursor-pointer text-sm flex justify-between items-center"
        >
          {selected || "Select a university"}
        </div>

        {open && (
          <div className="absolute mt-2 w-full bg-[#383838] rounded-lg shadow-lg z-20">
            {universities?.map((u, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelected(u?.name);
                  setOpen(false);
                }}
                className="px-3 py-2 text-white text-sm cursor-pointer hover:bg-[#505050] transition-all"
              >
                {u?.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-y-0 flex items-center px-2 pointer-events-none right-[2px]">
        <CarotSvg className="text-white group-hover:text-black" />
      </div>
    </div>
  );
};

export default UniversityDropdown;
