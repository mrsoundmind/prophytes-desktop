import { useState, useRef, useEffect } from "react";

export default function SelectField({
  label,
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
    <div className="">
      <label className="text-xl font-bold leading-6 block mb-3">{label}</label>

      <div ref={containerRef} className={`relative   ${className} `}>
        <input
          type="text"
          placeholder={value ? value : placeholder}
          value={searchTerm || selectedLabel}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            onSearchChange?.(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          className={`appearance-none sm:py-5 py-[14px] px-5 w-full bg-black text-white rounded-[10px] font-inter placeholder:text-white sm:placeholder:text-base placeholder:text-[15px] placeholder:font-normal`}
        />
        {value ? (
          <button
            onClick={handleClear}
            className={`absolute right-5 top-1/2 transform -translate-y-1/2 ${
              changeBg ? "text-white " : "text-black"
            } text-sm hover:text-red-400`}
            type="button"
          >
            ✕
          </button>
        ) : (
          <div
            className={`pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 ${
              changeBg ? "text-white" : "text-black"
            }  text-xs`}
          >
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`xs:size-5 size-4  ${
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
          </div>
        )}
        {isOpen && (
          <ul className="absolute z-[999] w-full mt-1 overflow-y-auto text-white bg-black rounded-lg shadow-lg max-h-60">
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
                    className="px-4 py-2 transition-colors cursor-pointer hover:bg-gray-200 hover:text-black z-[999]"
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
        )}
      </div>
    </div>
  );
}
