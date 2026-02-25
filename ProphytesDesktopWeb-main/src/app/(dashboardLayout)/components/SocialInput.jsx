"use client";

const SocialInput = ({
  label,
  placeholder,
  name,
  value,
  onChange,

  ...props
}) => {
  return (
    <div>
      <label className="block sm:mb-[9px] mb-1 text-base font-normal leading-6 text-black">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className={`sm:py-4 py-[8px] px-3 w-full  bg-transparent border border-black/70  text-black/70 rounded-[10px]  font-inter placeholder:text-black/70 focus:outline-none placeholder:text-base text-base placeholder:font-normal leading-5`}
        style={{ colorScheme: "dark" }}
        type="text"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
};

export default SocialInput;
