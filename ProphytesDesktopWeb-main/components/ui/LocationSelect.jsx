"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import { useGetAllStateQuery } from "@/src/redux/services/cityApi";
import AngleIcon from "@/public/img/icon/AngleIcon";

export default function LocationSelect({ newState, setNewState, searParams }) {
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [page, setPage] = useState(0);
  const [allState, setAllState] = useState([]);

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
    setNewState(city.name);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setSelectedCity(null);
    setInputValue("");
    setNewState("");
    setDropdownOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Select Location "
          className={`sm:h-[60px] border border-[#383838] h-[52px] pr-[30px] sm:pl-5 pl-4 w-full text-base  font-inter focus:outline-none placeholder:text-base  placeholder:font-normal leading-5 cursor-pointer 
              sm:bg-black bg-[#383838] rounded-full text-white placeholder:text-white/70
          `}
          value={inputValue}
          onFocus={() => {
            setDropdownOpen(true);
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedCity(null);
          }}
        />

        {inputValue ? (
          <button
            onClick={handleClear}
            className={`absolute  -translate-y-1/2 right-3 top-1/2 focus:outline-none 
               text-white
            `}
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          <span className="absolute text-lg text-white -translate-y-1/2 pointer-events-none right-3 top-1/2">
            <AngleIcon className="text-white xs:size-5 size-4" />
          </span>
        )}
      </div>

      {dropdownOpen && (
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="absolute z-[1001] mt-2 w-full sm:max-h-[275px] max-h-[260px] bg-white rounded-lg shadow-lg overflow-y-auto"
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
