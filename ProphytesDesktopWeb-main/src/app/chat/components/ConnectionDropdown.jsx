"use client";
import AngleDown from "@/public/img/icon/AngleDown";
import { useState, useRef, useEffect } from "react";

export default function ConnectionDropdown({
  value,
  onChange,
  options,
  label,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabel = options.find((opt) => opt.label === value)?.label;

  return (
    <div ref={ref} className="relative w-full">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between sm:h-[56px] h-12 px-[14px] bg-[#333333] border border-[#0D0D0D] rounded-[8px] cursor-pointer"
      >
        <span
          className={`md:text-sm text-xs md:leading-[22px] leading-[18px] ${
            value ? "text-white" : "text-white"
          }`}
        >
          {selectedLabel || label}
        </span>

        <div className="">
          {value ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="text-sm text-white/60 hover:text-white"
            >
              ✕
            </button>
          ) : (
            <AngleDown className="text-white" />
          )}
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-[#2b2b2b] border border-[#0D0D0D] rounded-[10px] overflow-hidden p-[6px]">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.label);
                setOpen(false);
              }}
              className="p-2 md:text-sm text-xs rounded-[6px] md:leading-[22px] leading-[18px] font-normal text-white/70 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
