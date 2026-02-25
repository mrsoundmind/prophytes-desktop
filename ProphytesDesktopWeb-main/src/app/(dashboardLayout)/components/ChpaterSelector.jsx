"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import AngleIcon from "@/public/img/icon/AngleIcon";
import { useGetChapterQuery } from "@/src/redux/services/chapterApi";

export default function ChpaterSelector({
  label,
  selectChpater,
  setSelectChpater,
  undergrade,
  alumini,
  organization,
  location,
  clearFiled,
}) {
  const [inputValue, setInputValue] = useState(selectChpater || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { debouncedFilters: chapterFilters, setFilter: setChapterFilters } =
    useDebouncedQuery();

  useEffect(() => {
    setInputValue(selectChpater || "");
  }, [selectChpater]);

  useEffect(() => {
    setChapterFilters("search", inputValue);
  }, [inputValue]);

  const {
    data: chapters,
    isLoading,
    isFetching,
    error,
  } = useGetChapterQuery({
    search: chapterFilters.search,
    skip: 0,
    limit: 20,
    university: undergrade || alumini,
    location: location,
    organization,
  });

  // Remove duplicate chapter_name
  const uniqueChapters = chapters?.chapters
    ? Array.from(
        new Map(
          chapters.chapters.map((item) => [item.chapter_name, item])
        ).values()
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (chapter) => {
    setInputValue(chapter.chapter_name);
    setSelectChpater(chapter);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setInputValue("");
    setSelectChpater("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (clearFiled) {
      setInputValue("");
      setSelectChpater("");
      setDropdownOpen(false);
      inputRef.current?.focus();
    }
  }, [clearFiled]);

  return (
    <div
      className="relative inline-block w-full pb-0 sm:pb-4"
      ref={dropdownRef}
    >
      <label className="block sm:mb-[9px] mb-1 text-base text-black font-normal leading-6">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="N/A"
          className="sm:py-4 py-[10px] px-3 w-full bg-transparent text-black/70 border text-base border-black/70 rounded-[10px] font-inter placeholder:text-white focus:outline-none placeholder:text-base placeholder:font-normal leading-5"
          value={inputValue}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {inputValue ? (
          <button
            onClick={handleClear}
            className="absolute -translate-y-1/2 text-black/70 right-3 top-1/2 focus:outline-none"
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          <span
            className="absolute text-lg -translate-y-1/2 pointer-events-none text-black/70 right-3 top-1/2"
            aria-hidden="true"
          >
            <AngleIcon className="text-black/70 xs:size-5 size-4" />
          </span>
        )}
      </div>

      {dropdownOpen && (
        <div className="absolute z-[1001] mt-2 w-full sm:max-h-[180px] h-[130px] bg-white rounded-lg shadow-lg overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.6)_transparent]">
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
          ) : uniqueChapters.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No Chapter Found!</p>
          ) : (
            uniqueChapters.map((item, index) => (
              <div
                key={index}
                className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                onMouseDown={() => handleSelect(item)}
              >
                <h4 className="text-sm font-medium text-gray-900">
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
