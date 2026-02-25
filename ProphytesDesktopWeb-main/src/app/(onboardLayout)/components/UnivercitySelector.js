import { useEffect, useRef, useState } from "react";

export default function UnivercitySelector({
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
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={
          showNewInput
            ? `Add New ${
                optionKey === "chapter_name" ? "chapter" : "university"
              } name...`
            : searchTerm || selectedLabel
        }
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
        } cursor-pointer focus:outline-none w-full xs:py-5 py-3 sm:pl-[30px] pl-4 rounded-[10px] text-base placeholder:text-base  font-normal`}
      />

      {value ? (
        <button
          onClick={handleClear}
          className={`absolute right-5 top-1/2 transform -translate-y-1/2 ${
            changeBg ? "text-white" : "text-black"
          } text-sm hover:text-red-400`}
          type="button"
          aria-label="Clear selection"
        >
          ✕
        </button>
      ) : null}

      {isOpen && (
        <ul
          className={`absolute z-10 w-full overflow-y-auto mt-3 ${
            changeBg ? "bg-black text-white" : "bg-white text-black"
          } rounded-lg shadow-lg max-h-60`}
        >
          {loading ? (
            <li className="px-4 py-3 text-center text-gray-500">Loading...</li>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((item, index) => {
              const val = getValue(item, optionKey);
              const label = getValue(item, optionLabel) || val;

              return (
                <li
                  key={index}
                  onClick={() => handleSelect(val)}
                  className="px-4 py-3 transition-colors cursor-pointer hover:bg-gray-200 hover:text-black"
                >
                  {label}
                </li>
              );
            })
          ) : (
            <li>
              {changeBg ? (
                <span className="px-4 py-4 mt-2 text-base font-normal text-black bg-white">
                  No results found
                </span>
              ) : (
                <p
                  onClick={handleAddNewSchoolClick}
                  className="px-4 py-5 text-base font-normal text-center cursor-pointer"
                >
                  + Add your Chapter
                </p>
              )}
            </li>
          )}
        </ul>
      )}

      {showNewInput && (
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={newChapter}
            onChange={(e) => setnewChapter(e.target.value)}
            placeholder={`Enter new ${
              optionKey === "chapter_name" ? "chapter" : "university"
            } name...`}
            className="cursor-pointer bg-white text-black focus:outline-none w-full xs:py-5 py-3 sm:pl-[30px] pl-4 rounded-[10px] text-base  font-normal placeholder:text-black "
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
