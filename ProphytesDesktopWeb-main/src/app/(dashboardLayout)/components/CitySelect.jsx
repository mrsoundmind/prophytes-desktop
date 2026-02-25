"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";

import AngleIcon from "@/public/img/icon/AngleIcon";
import { useGetAllCityQuery } from "@/src/redux/services/cityApi";

export default function CitySelect({
  label,
  newCity,
  setNewCity,
  searParams,
  isDiffrent = true,
  clearField,
  setClearField,
  className,
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

  // Reset when newCity changes
  useEffect(() => {
    setSelectedCity(null);
    setInputValue(newCity || "");
  }, [newCity]);

  // Search filter update
  useEffect(() => {
    setCityrFilter("search", inputValue);
    setPage(0);
    setAllState([]);
  }, [inputValue]);

  const { data, isLoading, isFetching } = useGetAllCityQuery({
    search: cityFilters.search,
    stateId: searParams,
    skip: page * 20,
    limit: 20,
  });

  useEffect(() => {
    if (data?.data) {
      if (page === 0) {
        setAllState(data.data);
      } else {
        setAllState((prev) => [...prev, ...data.data]);
      }
    }
  }, [data, page]);

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
    setNewCity(city);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setSelectedCity(null);
    setInputValue("");
    setNewCity("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (clearField) {
      setSelectedCity(null);
      setInputValue("");
      setNewCity("");
      setDropdownOpen(false);
      inputRef.current?.focus();
    }
  }, [clearField]);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {label && (
        <label
          className={`block mb-1 text-base font-normal leading-6 sm:mb-3 ${
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
          placeholder="Select city"
          className={`${className}`}
          value={typeof inputValue === "object" ? inputValue.name : inputValue}
          onFocus={() => {
            if (!searParams) {
              setShowTooltip(true);
              setTimeout(() => setShowTooltip(false), 2000);
            } else {
              setDropdownOpen(true);
              setInputValue("");
              setSelectedCity(null);
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
            Select state first
          </div>
        )}
      </div>

      {dropdownOpen && searParams && (
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="absolute z-[1001] mt-2 w-full sm:max-h-[275px] max-h-[260px] bg-white rounded-lg shadow-lg overflow-y-auto"
        >
          {allState.length === 0 && !isLoading ? (
            <p className="p-4 text-sm text-gray-500">No City Found!</p>
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
