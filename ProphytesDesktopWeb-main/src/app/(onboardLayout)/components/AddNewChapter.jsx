"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";

import AngleIcon from "@/public/img/icon/AngleIcon";
import { useGetChapterQuery } from "@/src/redux/services/chapterApi";
import { ArrayToObject } from "@/src/utils/ArrayToObject";

export default function AddNewChapter({
  newChapter,
  setnewChapter,
  isCustom,
  setIscustom = () => {},
}) {
  const [inputValue, setInputValue] = useState(newChapter || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [onboading, setOnboading] = useState({});
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { debouncedFilters: chapterFilters, setFilter: setchapterFilters } =
    useDebouncedQuery();

  useEffect(() => {
    setInputValue(newChapter || "");
  }, [newChapter]);

  // Update debounced filter
  useEffect(() => {
    setchapterFilters("search", inputValue);
  }, [inputValue]);

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);
  // console.log();

  const {
    data: chapters,
    isLoading,
    isFetching,
    error,
  } = useGetChapterQuery({
    search: chapterFilters.search,
    organization: onboading?.organization,
    skip: 0,
    limit: 20,
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      const exists = chapters?.chapters?.some(
        (c) => c.chapter_name.toLowerCase() === inputValue.toLowerCase()
      );

      if (!exists) {
        setnewChapter(inputValue);
        setIscustom(true);
      }
    }
  }, [inputValue, chapters, isLoading, isFetching]);

  // Select from dropdown
  const handleSelect = (chapter) => {
    if (chapter?.chapter_name) {
      setnewChapter(chapter.chapter_name);
      setInputValue(chapter.chapter_name);
      setIscustom(false);
    }
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setInputValue("");
    setnewChapter("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div
      className="relative inline-block w-full pb-0 sm:pb-4"
      ref={dropdownRef}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Select your Chapter"
          className={`py-5 pl-3 pr-[26px] w-full bg-black text-white  rounded-[10px] font-inter placeholder:text-white text-base focus:outline-none placeholder:text-base placeholder:font-normal leading-5`}
          value={inputValue}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        {inputValue ? (
          <button
            onClick={handleClear}
            className="absolute text-white -translate-y-1/2 right-3 top-1/2 focus:outline-none"
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          <span
            className="absolute text-lg -translate-y-1/2 pointer-events-none text-black/70 right-3 top-1/2"
            aria-hidden="true"
          >
            <AngleIcon className="text-white xs:size-5 size-4" />
          </span>
        )}
      </div>

      {dropdownOpen && (
        <div className="absolute z-[1001] mt-2 w-full max-h-[250px] bg-black text-white rounded-lg shadow-lg overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.6)_transparent]">
          {isLoading || isFetching ? (
            <div>
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="px-4 py-3 cursor-wait animate-pulse"
                >
                  <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          ) : chapters?.chapters?.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No Chapter Found!</p>
          ) : (
            chapters?.chapters?.map((item, index) => (
              <div
                key={index}
                className="px-3 py-3 cursor-pointer group sm:px-5 hover:bg-gray-100"
                onMouseDown={() => handleSelect(item)}
              >
                <h4 className="text-sm font-medium text-white group-hover:text-black">
                  {item.chapter_name}
                </h4>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
