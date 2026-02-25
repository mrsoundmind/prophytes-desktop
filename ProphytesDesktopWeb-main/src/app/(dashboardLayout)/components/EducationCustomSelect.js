"use client";
import React, { useState, useEffect, useRef } from "react";

const EducationCustomSelect = ({
  label = "",
  defaultValue = "",
  options = [],
  optionLabelKey = null,
  onChange = () => {},
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setInputValue(defaultValue || "");
  }, [defaultValue]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val) => {
    setInputValue(val);
    setShowDropdown(false);
    onChange(val);
  };

  const getDisplayValue = (item) => {
    return typeof item === "object" && optionLabelKey
      ? item[optionLabelKey]
      : item;
  };

  const handleClear = () => {
    setInputValue("");
    onChange("");
    setShowDropdown(false);
  };

  return (
    <div className="w-full  relative z-[99]" ref={dropdownRef}>
      <label className="block sm:mb-[9px] mb-1 text-base text-black font-normal leading-6">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          className={`sm:py-[14px] py-[10px] px-3 w-full  text-black/70 border border-black/70 rounded-[10px] font-inter placeholder:text-white text-base placeholder:text-base  placeholder:font-normal focus:outline-none`}
        />

        <span
          className="absolute text-black transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
          onClick={
            inputValue ? handleClear : () => setShowDropdown(!showDropdown)
          }
        >
          {inputValue ? (
            "✕"
          ) : (
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`xs:size-5 size-4  text-black/70`}
            >
              <path
                d="M3.14453 7.32324L9.48303 13.6617L15.8215 7.32324"
                stroke="currentColor"
                strokeWidth="1.58462"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
      </div>

      {showDropdown && (
        <ul className="absolute z-[999] w-full mt-1 overflow-y-auto text-white bg-black rounded-lg shadow-lg max-h-60">
          {options.map((item, index) => {
            const label = getDisplayValue(item);
            return (
              <li
                key={index}
                onClick={() => handleSelect(label)}
                className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-200 hover:text-black"
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default EducationCustomSelect;
