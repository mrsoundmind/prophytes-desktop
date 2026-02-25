"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";

import AngleIcon from "@/public/img/icon/AngleIcon";
import { useGetAllUniversitiesQuery } from "@/src/redux/services/universityApi";

export default function GraduationSchoolSelector({
  label,
  gradSchool,
  setGradSchool,
}) {
  const [inputValue, setInputValue] = useState(gradSchool || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const { debouncedFilters: versityFilters, setFilter: setversityFilters } =
    useDebouncedQuery();

  useEffect(() => {
    setInputValue(gradSchool || "");
  }, [gradSchool]);

  // Update debounced filter
  useEffect(() => {
    setversityFilters("search", inputValue);
  }, [inputValue]);

  const {
    data: versities,
    isLoading,
    isFetching,
    error,
  } = useGetAllUniversitiesQuery({
    search: versityFilters.search,
    skip: 0,
    limit: 20,
  });

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

  const handleSelect = (versity) => {
    setInputValue(versity.name);
    setGradSchool(versity);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setInputValue("");
    setGradSchool("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div
      className="relative inline-block w-full pb-0 sm:pb-4"
      ref={dropdownRef}
    >
      <label className="block sm:mb-[9px] mb-1 text-base font-normal leading-6 text-black">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="N/A"
          className={`sm:py-4 py-[10px] pl-3 pr-[26px] w-full bg-transparent text-black/70 border border-black/70 rounded-[10px] font-inter placeholder:text-white focus:outline-none text-base placeholder:text-base placeholder:font-normal leading-6`}
          value={inputValue}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
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
        <div className="absolute z-[1001] mt-2 w-full max-h-[300px] bg-white rounded-lg shadow-lg overflow-y-auto [scrollbar-width:thin] [scrollbar-color:rgba(0,0,0,0.6)_transparent]">
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
          ) : versities?.data?.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">No University Found!</p>
          ) : (
            versities?.data?.map((item, index) => (
              <div
                key={index}
                className="px-3 py-3 cursor-pointer sm:px-5 hover:bg-gray-100"
                onMouseDown={() => handleSelect(item)}
              >
                <h4 className="text-sm font-medium text-gray-900">
                  {item.name}
                </h4>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
