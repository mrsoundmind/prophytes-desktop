"use client";
import CopySvg from "@/public/img/icon/CopySvg";
import CrossSvg from "@/public/img/icon/CrossSvg";
import ShareIcon from "@/public/img/icon/Share";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import React, { useEffect, useRef, useState } from "react";

const ShareProfile = () => {
  const [shareShown, setShareShown] = useState(false);
  const [profileLink, setProfileLink] = useState("");
  const { data: userInfo } = useUserInfoQuery();
  const shareRef = useRef(null);

  useEffect(() => {
    if (!shareShown) return;

    const handleClickOutside = (event) => {
      if (shareRef.current && !shareRef.current.contains(event.target)) {
        setShareShown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareShown]);

  useEffect(() => {
    if (typeof window !== "undefined" && userInfo?.user?.id) {
      setProfileLink(`${window.location.origin}/members/${userInfo.user.id}`);
    }
  }, [userInfo]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileLink);
    SuccessAlert("Link copied to clipboard");
  };

  return (
    <div className="">
      <button
        className="flex gap-1 items-center  text-white rounded-full py-[14px] px-5 bg-[#3A3B3C]"
        onClick={() => setShareShown(!shareShown)}
      >
        Share Profile <ShareIcon className="" />
      </button>

      {shareShown && (
        <div
          ref={shareRef}
          className="absolute z-[9999] flex flex-col gap-2 py-8 px-6 sm:w-[465px] xs:w-[370px] w-[320px]  mt-2 bg-[#3A3B3C] rounded-[24px] sm:top-14 top-[100%] right-0  sm:right-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold text-white leading-[30px] font-montserrat">
              Your profile link
            </h4>

            <button
              onClick={() => setShareShown(false)}
              className="grid bg-black rounded-full size-9 place-content-center"
            >
              <CrossSvg />
            </button>
          </div>

          <p className="text-sm text-white/70 font-normal leading-[22px]">
            Your personalized link on Prophytes
          </p>

          <div className="w-full mt-6 sm:px-5 px-4 py-4 bg-[#141615] flex  justify-between rounded-[12px]">
            <p className="flex-1 min-w-0 mr-3 text-base font-normal leading-6 break-words whitespace-normal text-white/70">
              {profileLink}
            </p>
            <CopySvg
              className="flex-shrink-0 cursor-pointer"
              onClick={handleCopyLink}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareProfile;
