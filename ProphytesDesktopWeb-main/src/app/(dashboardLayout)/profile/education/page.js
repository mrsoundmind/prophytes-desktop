"use client";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import EditProfileSvg from "@/public/img/icon/EditProfileSvg";
import { useState } from "react";
import UserInformation from "../../components/UserInformation";
import EditEducationModal from "../../components/EditEducationModal";
import ShareProfile from "../../components/ShareProfile";

const Education = () => {
  const [open, setOpen] = useState(false);
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const user = userInfo?.user;

  return (
    <div>
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center flex-1 sm:flex-none justify-between gap-[10px] ">
          <h3 className="sm:text-[36px] text-2xl   text-white  font-semibold sm:leading-[48px]  leading-9  font-montserrat">
            Education
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
              label="Undergraduate School"
              title={user?.education?.underGraduateSchool?.name}
              marginBottom="30px"
            />
            <UserInformation
              label="Classification"
              title={user?.education?.classification}
              marginBottom="30px"
            />
            <UserInformation
              label="Member Since"
              title={user?.education?.yearMemberSince}
              marginBottom="30px"
            />
            <UserInformation
              label="Current Chapter"
              title={user?.education?.currentChapter?.name}
            />
          </div>
        </div>
        <>
          <div>
            <UserInformation
              label="Graduation School"
              title={user?.education?.graduateSchool?.name}
              marginBottom="30px"
            />
            <UserInformation
              label="Membership Status"
              title={user?.education?.seasonMemberSince}
              marginBottom="30px"
            />
            <UserInformation
              label="Initiated Chapter"
              title={user?.education?.initiatedChapter?.name}
              // marginBottom="30px"
            />
          </div>
        </>
      </div>

      <EditEducationModal setOpen={setOpen} open={open} />
    </div>
  );
};

export default Education;
