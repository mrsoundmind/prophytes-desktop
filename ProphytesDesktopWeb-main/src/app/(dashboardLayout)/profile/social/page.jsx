"use client";
import React, { useState } from "react";

import SocialEditModal from "../../components/SocialEditModal";
import EditProfileSvg from "@/public/img/icon/EditProfileSvg";
import ShareProfile from "../../components/ShareProfile";
import ButtonSkeleton from "@/components/skeleton/ButtonSkeleton";
import InputFieldSkeleton from "@/components/skeleton/InputFieldSkeleton";
import UserInformation from "../../components/UserInformation";
import { useUserInfoQuery } from "@/src/redux/services/userApi";

const Social = () => {
  const [open, setOpen] = useState(false);
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const user = userInfo?.user?.link && userInfo?.user?.link;

  return (
    <>
      <div className="sm:flex gap-[10px]">
        <h3 className="sm:text-[36px] text-2xl  text-white  font-semibold sm:leading-[48px] leading-9   font-montserrat">
          Social Media
        </h3>
        <div className="flex items-center flex-1 gap-3 sm:justify-between">
          <button
            className="flex items-center justify-center h-10 gap-2 px-4 text-black bg-white rounded-full"
            onClick={() => setOpen(true)}
          >
            <EditProfileSvg /> <span>Edit</span>
          </button>
          <ShareProfile />
        </div>
      </div>

      <div>
        {user_loading ? (
          <>
            <div className="grid lg:grid-cols-2 gap-[30px]">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <InputFieldSkeleton key={i} />
                ))}
            </div>
            <ButtonSkeleton />
          </>
        ) : (
          <>
            <div className="grid lg:grid-cols-2 lg:gap-[30px] p-10 bg-[#141615] border border-[#383838] rounded-[16px] shadow-lg mt-6 w-full">
              <div className="">
                <div>
                  <UserInformation
                    label="Facebook"
                    title={user?.facebook}
                    marginBottom="30px"
                  />
                  <UserInformation
                    label="Instagram"
                    title={user?.instagram}
                    marginBottom="30px"
                  />

                  <UserInformation
                    label="Website"
                    title={user?.website}
                    marginBottom="30px"
                  />
                </div>
              </div>
              <>
                <div>
                  <UserInformation
                    label="Twitter"
                    title={user?.twitter}
                    marginBottom="30px"
                  />
                  <div>
                    <UserInformation
                      label="Linkedin"
                      title={user?.linkedIn}
                      marginBottom="30px"
                    />
                  </div>
                  <div>
                    <UserInformation
                      label="Tiktok"
                      title={user?.tiktok}
                      marginBottom="30px"
                    />
                  </div>
                </div>
              </>
            </div>
          </>
        )}
      </div>
      <SocialEditModal open={open} setOpen={setOpen} />
    </>
  );
};

export default Social;
