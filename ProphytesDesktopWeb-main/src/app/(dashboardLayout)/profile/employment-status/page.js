"use client";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import UserInformation from "../../components/UserInformation";
import EditProfileSvg from "@/public/img/icon/EditProfileSvg";
import { useState } from "react";
import EmployementEditModal from "../../components/EmployementEditModal";
import ShareProfile from "../../components/ShareProfile";

const EmpolymentStatus = () => {
  const [open, setOpen] = useState(false);
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const user = userInfo?.user;

  const date =
    user?.employment?.createdAt && new Date(user?.employment?.createdAt);

  const employeMentSince = date?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex sm:items-center items-end flex-1 lg:flex-none justify-between gap-[10px]">
          <h3 className="sm:text-[36px] text-2xl  text-white  font-semibold sm:leading-[48px] leading-9   font-montserrat">
            Employment Status
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

      <div className="grid lg:grid-cols-2 lg:gap-[30px] p-10 bg-[#141615] border border-[#383838] rounded-[16px] shadow-lg mt-6">
        <div className="">
          <div>
            <UserInformation
              label="Status"
              title={user?.employment?.status}
              marginBottom="30px"
            />
            <UserInformation
              label="Position"
              title={user?.employment?.position}
              marginBottom="30px"
            />
          </div>
        </div>
        <div>
          <div>
            <UserInformation
              label="Company Name"
              title={user?.employment?.companyName}
              marginBottom="30px"
            />
          </div>
          <div>
            <p className="text-sm font-normal leading-[22px] text-white/70 lg:mb-3 mb-[6px]">
              Since
            </p>
            <h4 className="text-xl font-semibold leading-[30px] text-white font-montserrat">
              {employeMentSince ? employeMentSince : "N/A"}
            </h4>
          </div>
        </div>
      </div>
      <EmployementEditModal setOpen={setOpen} open={open} />
    </>
  );
};

export default EmpolymentStatus;
