"use client";
import EditProfileSvg from "@/public/img/icon/EditProfileSvg";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import UserInformation from "../../components/UserInformation";
import ShareProfile from "../../components/ShareProfile";
import MentorEditModal from "../../components/MentorEditModal";
import { useState } from "react";
const MentorShip = () => {
  const [open, setOpen] = useState(false);
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const user = userInfo?.user;

  return (
    <div>
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-[10px] sm:items-center items-end flex-1 sm:flex-none justify-between gap-[10px]] ">
          <h3 className="sm:text-[36px] text-2xl  text-white  font-semibold sm:leading-[48px] leading-9  font-montserrat">
            Mentorship
          </h3>
          <button
            className="flex items-center justify-center h-10 gap-2 px-4 text-black bg-white rounded-full"
            onClick={() => setOpen(true)}
          >
            <EditProfileSvg /> <span>Edit</span>
          </button>
        </div>
        <ShareProfile />
      </div>

      <div className=" p-10 bg-[#141615] border border-[#383838] rounded-[16px] shadow-lg mt-6 overflow-hidden">
        <div className="">
          <UserInformation
            label="Status"
            title={user?.mentorship?.status}
            marginBottom="30px"
          />

          <div>
            <p className="text-sm font-normal leading-[22px] text-white/70 lg:mb-3 mb-[6px]">
              Details
            </p>
            <h4 className="text-xl font-medium leading-[30px] text-white font-montserrat break-words  break-all  whitespace-normal">
              {user?.mentorship?.details ?? "N/A"}
            </h4>
          </div>
        </div>
      </div>

      <MentorEditModal setOpen={setOpen} open={open} />
    </div>
  );
};

export default MentorShip;
