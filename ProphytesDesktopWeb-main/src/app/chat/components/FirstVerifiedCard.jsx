"use client";

import { useSubmitForReviewMutation } from "@/src/redux/services/conversationApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FirstVerifiedCard({ verificationId }) {
  const router = useRouter();

  const [submit, { isLoading, data }] = useSubmitForReviewMutation();

  useEffect(() => {
    if (data) {
      // router.push("/chat");
      window.location.reload();
    }
  }, [data]);
  return (
    <>
      <div className="md:w-[548px] w-[358px] mt-10 flex items-center justify-center ">
        <div className=" bg-[#3C4040] md:px-10 px-6 md:py-10 py-6 rounded-[20px] border-b border-[#333333]">
          <button
            className="text-sm font-semibold leading-[22px] text-[#000000] bg-[#F79400] py-[3px] px-[9px] rounded-full  uppercase block sm:m-auto"
            // style={{ backgroundColor: `#${orgColor}` }}
          >
            Admin Review Required
          </button>

          <h4 className="text-[28px] text-white mb-3 font-semibold sm:text-center text-left mt-5 ">
            You’re First in This Chapter
          </h4>

          <p className="text-[#FFFFFFB2] sm:text-center text-left  text-base leading-6">
            This chapter doesn’t have any verified members on Prophytes yet. An
            admin will review your proof of membership first. Once you’re
            verified, you’ll unlock Chapter Access and help verify new members
            who join after you.
          </p>

          <button
            onClick={() => submit({ verificationId })}
            className="w-full py-3 mt-5 font-medium bg-white rounded-full"
          >
            {isLoading ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </div>
    </>
  );
}
