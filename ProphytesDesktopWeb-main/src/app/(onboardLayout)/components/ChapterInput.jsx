import { useEffect, useRef, useState } from "react";
import AddNewChapter from "./AddNewChapter";

export default function ChapterInput({
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
  newChapter,
  setnewChapter,
  setValue,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showNewInput, setShowNewInput] = useState(false);

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
    onChange({ target: { value: val } });
    setIsOpen(false);
    setSearchTerm("");
    setShowNewInput(false);
  };

  const handleClear = () => {
    if (setValue) setValue("");
    onChange({ target: { value: "" } });
    setSearchTerm("");
    setIsOpen(false);
    setShowNewInput(false);
  };

  const handleAddNewSchoolClick = () => {
    setIsOpen(false);
    setShowNewInput(true);
    setnewChapter("");
    setSearchTerm("");
  };

  const handleConfirmNewSchool = () => {
    if (newChapter.trim()) {
      onChange({ target: { value: newChapter.trim() } });
      setShowNewInput(false);
      setnewChapter("");
      setSearchTerm("");
    }
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
    <div ref={containerRef} className={` w-full ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm || selectedLabel || value}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            onSearchChange?.(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          className={`w-full border-0 outline-none focus:outline-none sm:h-[60px] h-[50px]  pl-5  rounded-[8px] text-base font-normal placeholder:text-base  sm:pr-0 pr-[10px] text-white placeholder:text-white/70 cursor-pointer bg-[#141616]`}
        />

        {value || showNewInput ? (
          <button
            onClick={handleClear}
            className={`absolute right-5 top-1/2 transform -translate-y-1/2
               text-white
             text-sm hover:text-red-400`}
            type="button"
            aria-label="Clear selection"
          >
            ✕
          </button>
        ) : null}
      </div>

      {isOpen && (
        <ul
          className={` z-10  overflow-y-auto mt-3 ${
            changeBg ? "bg-black text-white" : "bg-white text-black"
          } rounded-lg shadow-lg max-h-60 z-[999]`}
        >
          {/* {optionKey === "chapter_name" && (
            <p
              onClick={handleAddNewSchoolClick}
              className="px-4 py-5 cursor-pointer text-center xs:text-base text-[15px] font-normal text-white bg-[#141616]"
            >
              + Add your Chapter
            </p>
          )} */}
          {loading ? (
            <li className="px-4 py-3 text-center text-gray-500">Loading...</li>
          ) : (
            filteredOptions.length > 0 &&
            filteredOptions.map((item, index) => {
              const val = getValue(item, optionKey);
              const label = getValue(item, optionLabel) || val;

              return (
                <li
                  key={index}
                  onClick={() => handleSelect(val)}
                  className="px-4 py-3 transition-colors bg-[#141616] cursor-pointer hover:bg-gray-200 hover:text-black"
                >
                  {label}
                </li>
              );
            })
          )}
        </ul>
      )}

      {/* {showNewInput && (
        <div className="">
          <div className="bg-[#06000000] flex gap-2 justify-center border border-[#ffffff30] rounded-2xl py-3 my-5 px-5 md:px-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mt-1 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-bold text-white md:text-lg xl:text-xl">
                Add your Chapter
              </h4>
              <p className="mt-2 text-gray-200 max-w-[300px] text-xs md:text-base mx-auto">
                Your chapter isn&apos;t listed. Enter its name below to help us
                grow and ensure everyone is represented!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <AddNewChapter
              newChapter={newChapter}
              setnewChapter={setnewChapter}
              isCustom={isCustom}
              setIscustom={setIscustom}
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
