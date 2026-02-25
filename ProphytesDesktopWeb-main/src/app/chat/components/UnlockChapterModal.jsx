"use client";

import BlackCircle from "@/public/img/icon/BlackCircle";
import CloseCircle from "@/public/img/icon/CloseCircle";
import LockIcon from "@/src/assets/icon/LockIcon";
import UnlockIcon from "@/src/assets/icon/UnlockIcon";

export default function UnlockChapterModal({ color }) {
  return (
    <>
      <div className="md:w-full w-[358px]">
        <div className="text-center bg-[#3C4040] p-5 rounded-[20px] border-b border-[#333333]">
          <UnlockIcon color={color} className="w-[74px] h-[74px] mx-auto" />

          <h4 className="text-[28px] text-white font-semibold ">
            Chapter <br /> Access Unlocked+
          </h4>

          <p className="text-[#FFFFFFB2] mt-4 ">
            You’re verified. You’ll now see new members entering the Chapter
            Verification Chat and can vouch or flag them to protect the chapter.
          </p>
        </div>
      </div>
    </>
  );
}
