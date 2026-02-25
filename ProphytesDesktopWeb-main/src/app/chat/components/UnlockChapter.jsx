"use client";

import LockIcon from "@/src/assets/icon/LockIcon";
import { useEnterChapterVerificationMutation } from "@/src/redux/services/conversationApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UnlockChapter({ color, verificationId }) {
  const router = useRouter();
  const [enter, { isLoading, data }] = useEnterChapterVerificationMutation();

  useEffect(() => {
    if (data) {
      // router.push("/chat");
      // router.refresh();
      window.location.reload();
    }
  }, [data]);
  return (
    <>
      <div className="md:w-[548px] w-[358px]   m-auto mt-10 ">
        <div className=" bg-[#3C4040] md:px-10 px-5 md:py-10 py-6 rounded-[20px] border-b border-[#333333]">
          <LockIcon color={color} className="w-[74px] h-[74px] mx-auto" />

          <h2 className="text-[28px] font-semibold leading-[40px] text-center mb-3">
            Unlock <br /> Chapter Access
          </h2>

          <p className="text-[#FFFFFFB2] text-base leading-6 text-center">
            You’re entering the Chapter Verification Chat. Verified chapter
            members will confirm your membership so you can join the official
            chapter space.
          </p>

          <div className="bg-[#272727] rounded-[12px] py-[14px] px-4 sm:my-6  my-4">
            <p className="text-sm font-normal leading-6 text-white/70">
              Your intro will post automatically. Members may ask a quick
              follow-up. You’ll be notified when your status changes.
            </p>
          </div>

          <button
            onClick={() => enter({ verificationId })}
            className="w-full py-3 font-medium bg-white rounded-full"
          >
            {isLoading ? "Entering..." : "Enter Chapter Chat"}
          </button>
        </div>
      </div>
    </>
  );
}
