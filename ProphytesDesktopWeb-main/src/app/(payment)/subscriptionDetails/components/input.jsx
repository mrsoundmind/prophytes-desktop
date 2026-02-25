import React from "react";

export default function Input({
  label,
  placeholder = "",
  name,
  value,
  onChange,
  isEdit = true,
  ...props
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="mb-2 text-sm font-medium">
        {label}
      </label>
      {isEdit ? (
        <input
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Type here..."}
          className=" bg-[#1E1E1E] placeholder:text-base text-base border-gray-300 rounded-md px-3 py-4 focus:outline-none focus:ring-2 focus:ring-white"
          {...props}
        />
      ) : (
        <p className="text-sm text-gray-800">{value}</p>
      )}
    </div>
  );
}
