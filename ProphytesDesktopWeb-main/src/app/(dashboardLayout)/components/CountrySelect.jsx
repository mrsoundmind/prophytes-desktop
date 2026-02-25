"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import { useGetAllCountriesQuery } from "@/src/redux/services/cityApi";
import AngleIcon from "@/public/img/icon/AngleIcon";

export default function CountrySelect({
  label,
  newCountry,
  setNewCountry,
  isDiffrent = true,
  clearField,
  setClearField,
  className,
  placeholder,
}) {
  const [inputValue, setInputValue] = useState("United States");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [page, setPage] = useState(0);
  const [allCities, setAllCities] = useState([]);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const { debouncedFilters: cityFilters, setFilter: setCityFilter } =
    useDebouncedQuery();

  useEffect(() => {
    if (newCountry?.name) {
      setSelectedCity(newCountry);
      setInputValue(newCountry.name);
    }
  }, [newCountry]);

  useEffect(() => {
    setPage(0);
    setAllCities([]);

    if (inputValue?.trim()) {
      setCityFilter("search", inputValue);
    } else {
      // remove search filter to load all countries
      setCityFilter("search", "");
    }
  }, [inputValue]);

  const { data, isLoading, isFetching } = useGetAllCountriesQuery({
    search: cityFilters.search || undefined,
    skip: page * 20,
    limit: 20,
  });

  useEffect(() => {
    if (data?.data) {
      setAllCities((prev) =>
        page === 0 ? data.data : [...prev, ...data.data]
      );
    }
  }, [data]);

  /**
   * Close dropdown on outside click
   */
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

  const handleSelect = (country) => {
    setSelectedCity(country);
    setInputValue(country.name);
    setNewCountry(country);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setSelectedCity(null);
    setInputValue("");
    setNewCountry(null);
    setDropdownOpen(true);
    inputRef.current?.focus();
    setClearField?.(true);
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <label className="block mb-1 text-base font-normal text-black sm:mb-3">
        {label}
      </label>

      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={className}
          value={inputValue}
          onFocus={() => setDropdownOpen(true)}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSelectedCity(null);
          }}
        />

        {inputValue ? (
          <button
            onClick={handleClear}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              isDiffrent ? "text-black" : "text-white"
            }`}
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          <span className="absolute text-white -translate-y-1/2 pointer-events-none right-3 top-1/2">
            <AngleIcon className="text-white xs:size-5 size-4" />
          </span>
        )}
      </div>

      {dropdownOpen && (
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="absolute z-[1001] mt-2 w-full max-h-[260px] bg-white rounded-lg shadow-lg overflow-y-auto"
        >
          {allCities.length === 0 && !isLoading ? (
            <p className="p-4 text-sm text-gray-500">No Country Found!</p>
          ) : (
            <>
              {allCities.map((item, index) => (
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

              {(isFetching || isLoading) && (
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
