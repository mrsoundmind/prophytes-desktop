import React from "react";

const Note = ({ note, setNote, label }) => {
  return (
    <div className="mt-4 md:mt-5">
      <label className="block md:text-sm text-xs md:leading-[22px] leading-[18px] text-white/70 sm:mb-[10px] mb-1.5">
        {label}
      </label>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="e.g., I recall him as #1 of the fall ’21 Line"
        className="w-full bg-[#333333] md:h-[122px] h-[82px] px-[14px] pt-3 rounded-[8px] border border-[#0D0D0D] text-xs text-white/70 focus:outline-none"
      />
    </div>
  );
};

export default Note;
