import AngleIcon from "@/public/img/icon/AngleIcon";
import { useState, useEffect, useRef } from "react";

export default function CustomDropdown({
  label,
  options = [],
  value = "",
  onChange = () => {},
  placeholder = "Select...",
  onClear = () => {},
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  const handleClear = () => {
    onChange("");
    setIsOpen(false);
    onClear();
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Label */}
      <p className="block sm:mb-[9px] mb-1 text-base text-black font-normal leading-6">
        {label}
      </p>

      {/* Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className={`${className} relative w-full flex justify-between items-center px-4 py-3 border rounded-lg`}
      >
        <span>{value || placeholder}</span>

        <div className="flex items-center space-x-2">
          {value ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="text-lg text-gray-400 hover:text-red-500"
              title="Clear"
              type="button"
            >
              ✕
            </button>
          ) : (
            <AngleIcon className="text-black/70 xs:size-5 size-4" />
          )}
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute z-[999] w-full bg-white text-[#333] border border-[#333] rounded-lg shadow-lg mt-2 max-h-60 overflow-y-auto">
          {options.map((option, i) => (
            <li
              key={i}
              onClick={() => handleSelect(option)}
              className="px-4 py-3 text-black cursor-pointer hover:bg-gray-100 hover:text-black"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
