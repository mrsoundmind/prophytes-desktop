"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import { useGetAllStateQuery } from "@/src/redux/services/cityApi";
import AngleIcon from "@/public/img/icon/AngleIcon";

export default function StateSelect({
  label,
  newState,
  setNewState,
  searParams,
  isDiffrent = true,
  showLabel = true,
  className,
  clearField,
  setClearField,
}) {
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [page, setPage] = useState(0);
  const [allState, setAllState] = useState([]);
  const [showTooltip, setShowTooltip] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const { debouncedFilters: cityFilters, setFilter: setCityrFilter } =
    useDebouncedQuery();

  // Reset when newState changes
  useEffect(() => {
    setSelectedCity(null);
    setInputValue(newState || "");
  }, [newState]);

  // Search filter update
  useEffect(() => {
    setCityrFilter("search", inputValue);
    setPage(0);
    setAllState([]);
  }, [inputValue]);

  const { data, isLoading, isFetching } = useGetAllStateQuery({
    search: cityFilters.search,
    countryId: searParams,
    skip: page * 20,
    limit: 20,
  });

  useEffect(() => {
    if (data?.states) {
      if (page === 0) {
        setAllState(data.states);
      } else {
        setAllState((prev) => [...prev, ...data.states]);
      }
    }
  }, [data]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
        setShowTooltip(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScroll = () => {
    if (!listRef.current || isFetching) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSelect = (city) => {
    setSelectedCity(city);
    setInputValue(city.name);
    setNewState(city);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setSelectedCity(null);
    setInputValue("");
    setNewState("");
    setDropdownOpen(false);
    inputRef.current?.focus();
    setClearField(true);
  };

  useEffect(() => {
    if (clearField) {
      setSelectedCity(null);
      setInputValue("");
      setNewState("");
      setDropdownOpen(false);
      inputRef.current?.focus();
    }
  }, [clearField]);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {showLabel && (
        <label
          className={`block mb-1 text-base font-normal leading-6  sm:mb-3 ${
            isDiffrent ? "text-black" : "text-white/70"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={showLabel ? "Select State " : "Select State "}
          className={` ${className} text-base`}
          // value={showLabel ? inputValue : inputValue.name}
          value={typeof inputValue === "object" ? inputValue.name : inputValue}
          onFocus={() => {
            if (!searParams) {
              setShowTooltip(true);
              setTimeout(() => setShowTooltip(false), 2000);
            } else {
              setDropdownOpen(true);
            }
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedCity(null);
          }}
        />

        {inputValue ? (
          <button
            onClick={handleClear}
            className={`absolute  -translate-y-1/2 right-3 top-1/2 focus:outline-none ${
              isDiffrent ? "text-black" : "text-white"
            }`}
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          <span className="absolute text-lg text-white -translate-y-1/2 pointer-events-none right-3 top-1/2">
            <AngleIcon className="text-white xs:size-5 size-4" />
          </span>
        )}

        {/* Tooltip */}
        {showTooltip && !searParams && (
          <div className="absolute left-0 mt-2 w-max bg-black text-white text-xs px-3 py-2 rounded shadow-lg z-[999]">
            Select country first
          </div>
        )}
      </div>

      {dropdownOpen && searParams && (
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="absolute z-[999] mt-2 w-full sm:max-h-[275px] max-h-[260px] bg-white rounded-lg shadow-lg overflow-y-auto"
        >
          {allState.length === 0 && !isLoading ? (
            <p className="p-4 text-sm text-gray-500">No State Found!</p>
          ) : (
            <>
              {allState.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(item)}
                >
                  <h4 className="text-sm font-medium text-gray-900">
                    {item.name}
                  </h4>
                </div>
              ))}

              {isLoading && (
                <div className="p-3 text-sm text-center text-gray-500">
                  Loading...
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
