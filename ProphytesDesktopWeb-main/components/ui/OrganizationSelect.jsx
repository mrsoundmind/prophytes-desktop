"use client";

import { useState, useEffect, useRef } from "react";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import AngleIcon from "@/public/img/icon/AngleIcon";
import { useGetAllUniversitiesQuery } from "@/src/redux/services/universityApi";
import { useGetAllOrganizationsQuery } from "@/src/redux/services/organizationApi";

export default function OrganizationSelect({
  label,
  newOrganization,
  setNewOrganization,
  isDiffrent = true,
  className,
  placeholder,
  crossColor = false,

  setClearField = () => {},
}) {
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [allOrganization, setAllOrganization] = useState([]);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const listRef = useRef(null);

  const { debouncedFilters: schoolFilter, setFilter: setSchoolFilter } =
    useDebouncedQuery();

  // Reset when newSchool changes
  useEffect(() => {
    setInputValue(newOrganization || "");
  }, [newOrganization]);

  // Search filter update
  useEffect(() => {
    setSchoolFilter("search", inputValue);
    setPage(0);
    setAllOrganization([]);
  }, [inputValue]);

  const { data, isLoading, isFetching } = useGetAllOrganizationsQuery({
    search: schoolFilter.search,
    skip: page * 20,
    limit: 20,
  });

  useEffect(() => {
    if (data?.organizations) {
      if (page === 0) {
        setAllOrganization(data.organizations);
      } else {
        setAllOrganization((prev) => [...prev, ...data.organizations]);
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

  const handleSelect = (org) => {
    setInputValue(org.organization);
    setNewOrganization(org);
    setDropdownOpen(false);
  };

  const handleClear = () => {
    setInputValue("");
    setNewOrganization("");
    setDropdownOpen(false);
    inputRef.current?.focus();
    setClearField(true);
  };

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      {label && (
        <label
          className={`block  text-base font-normal leading-6  sm:mb-2 ${
            isDiffrent ? "text-black" : "text-white/70"
          }`}
        >
          {label}
        </label>
      )}

      <div className="relative ">
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={`${className}`}
          // value={inputValue}
          value={typeof inputValue === "object" ? inputValue.name : inputValue}
          onFocus={() => {
            setDropdownOpen(true);
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />

        {inputValue ? (
          <button
            onClick={handleClear}
            className={`absolute  -translate-y-1/2 right-3 top-1/2 focus:outline-none ${
              crossColor ? "text-black" : "text-white"
            }`}
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : (
          <span
            className={`absolute text-lg  -translate-y-1/2 pointer-events-none right-3 top-1/2 ${
              crossColor ? "text-black" : "text-white"
            }`}
          >
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
          {allOrganization.length === 0 && !isLoading ? (
            <p className="p-4 text-sm text-gray-500">No Organization Found!</p>
          ) : (
            <>
              {allOrganization.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(item)}
                >
                  <h4 className="text-sm font-medium text-gray-900">
                    {item.organization}
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
