"use client";
import { useEffect, useRef, useState } from "react";

export default function StateSelector({
  options = [],
  optionKey,
  optionLabel,
  placeholder = "Select...",
  value,
  onChange,
  className = "",
  changeBg,
  onSearchChange,
  loading = false,
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
      getValue(item, optionLabel) || getValue(item, optionKey) || "";
    const label = rawLabel.toLowerCase();
    const matchesSearch = label.includes(searchTerm.toLowerCase());

    if (!matchesSearch || seenLabels.has(label)) {
      return false;
    }

    seenLabels.add(label);
    return true;
  });

  const handleSelect = (val) => {
    onChange({ target: { value: val } });
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    onChange({ target: { value: "" } });
    setSearchTerm("");
    setIsOpen(false);
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
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm || selectedLabel}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setIsOpen(true);
          onSearchChange?.(e.target.value);
        }}
        onFocus={() => setIsOpen(true)}
        className={`appearance-none ${
          changeBg
            ? "bg-black text-white placeholder:text-white"
            : "bg-white placeholder:text-black"
        } cursor-pointer focus:outline-none w-full py-5  sm:pl-[30px] pl-4 rounded-[10px] text-base  font-normal`}
      />

      {value && (
        <button
          onClick={handleClear}
          className={`absolute right-5 top-1/2 transform -translate-y-1/2 className="text-lg text-gray-400 hover:text-red-500" ${
            changeBg ? "text-white" : "text-black"
          } text-sm hover:text-red-400`}
          type="button"
        >
          ✕
        </button>
      )}

      {isOpen && (
        <ul className="absolute z-[999] w-full mt-1 overflow-auto bg-black border border-[#333] rounded-md shadow-lg max-h-60 t">
          {loading ? (
            <li className="px-4 py-2 text-white">Loading...</li>
          ) : filteredOptions.length === 0 ? (
            <li className="px-4 py-2 text-white">No results found</li>
          ) : (
            filteredOptions.map((option) => (
              <li
                key={getValue(option, optionKey)}
                onClick={() => handleSelect(getValue(option, optionKey))}
                className="px-4 py-2 text-white transition-all duration-300 ease-in-out cursor-pointer hover:bg-gray-100 hover:text-black"
              >
                {getValue(option, optionLabel)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
