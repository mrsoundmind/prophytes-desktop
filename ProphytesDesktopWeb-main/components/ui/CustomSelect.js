"use clients";
import { useEffect, useRef, useState } from "react";

export default function CustomSelect({
  options = [],
  optionKey,
  optionLabel,
  placeholder = "Select...",
  value,
  setValue,
  className = "",
  changeBg,
  onSearchChange,
  loading = false,
  autoSearch = true,
  isWorking = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const getValue = (item, accessor) => {
    if (typeof accessor === "function") return accessor(item);
    if (typeof accessor === "string") {
      return accessor
        .split(".")
        .reduce(
          (acc, key) => (acc && acc[key] !== undefined ? acc[key] : ""),
          item
        );
    }
    return "";
  };

  const seenLabels = new Set();

  const filteredOptions = options.filter((item) => {
    const rawLabel =
      getValue(item, optionLabel) ||
      getValue(item, optionKey) ||
      "Not Specified";
    const label = rawLabel.toLowerCase();
    const matchesSearch = label.includes(searchTerm.toLowerCase());

    if (!matchesSearch || seenLabels.has(label)) {
      return false;
    }

    seenLabels.add(label);
    return true;
  });

  const handleSelect = (val) => {
    if (setValue) setValue(val); // Update value on selection
    onSearchChange?.(""); // Clear search after selection
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    if (setValue) setValue("");
    setSearchTerm("");
    setIsOpen(false);
    onSearchChange?.("");
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedLabel =
    getValue(
      options.find((op) => getValue(op, optionKey) === value) || {},
      optionLabel
    ) || "";

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className} rounded-full border border-[#383838] ${
        !isWorking
          ? "bg-white/10 text-white placeholder:text-white/70 cursor-not-allowed"
          : changeBg
          ? "sm:bg-black bg-[#383838] text-[#FFFFFFB2] placeholder:text-[#FFFFFFB2]"
          : "bg-white placeholder:text-black"
      }`}
    >
      <div>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm || selectedLabel}
          onChange={(e) => {
            const newValue = e.target.value;
            setSearchTerm(newValue);
            setIsOpen(true);
            onSearchChange?.(newValue); // Trigger search for dropdown options
            if (autoSearch && setValue) setValue(newValue); // Update value while typing if autoSearch is true
          }}
          disabled={!isWorking}
          onFocus={() => setIsOpen(true)}
          className={`appearance-none w-[85%] border-0 outline-none focus:outline-none sm:h-[60px] h-[50px]  sm:pl-5 pl-[14px]  rounded-full text-base font-normal placeholder:text-base bg-transparent sm:pr-0 pr-[10px] 
        ${
          !isWorking
            ? "text-white placeholder:text-white/70 cursor-not-allowed"
            : changeBg
            ? "text-white placeholder:text-white/70 cursor-pointer"
            : "text-black placeholder:text-black cursor-pointer"
        }`}
        />
      </div>

      {value ? (
        <button
          onClick={handleClear}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            changeBg ? "text-white" : "text-black"
          } text-sm hover:text-red-400`}
          type="button"
        >
          ✕
        </button>
      ) : (
        <button
          onClick={handleOpen}
          disabled={!isWorking}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
            changeBg ? "text-white" : "text-black"
          }  ${isWorking ? "" : "cursor-not-allowed"}  text-xs h-full`}
        >
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`xs:size-5 size-4 ${
              changeBg ? "text-white" : "text-black"
            }`}
          >
            <path
              d="M3.14453 7.32324L9.48303 13.6617L15.8215 7.32324"
              stroke="currentColor"
              strokeWidth="1.58462"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="z-[9999] relative">
          <ul className="absolute w-full mt-3 overflow-y-auto text-white/70 bg-[#383838] rounded-lg shadow-lg max-h-[450px] border border-white/10">
            {loading ? (
              <li className="px-4 py-2 text-gray-400">Loading...</li>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((item, index) => {
                const val = getValue(item, optionKey);
                const label = getValue(item, optionLabel) || val;

                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(val)}
                    className="px-4 py-3 transition-colors cursor-pointer hover:bg-black hover:text-white/70 z-[1001] border-b border-white/10 last:border-none"
                  >
                    {label}
                  </li>
                );
              })
            ) : (
              <li>
                {loading ? (
                  <span className="px-4 py-2 text-gray-400">Loading...</span>
                ) : (
                  <span className="px-4 py-2 text-gray-400">
                    No results found
                  </span>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
