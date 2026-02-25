"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";
import Camera from "@/public/img/icon/Camera";
import Uploadicon from "@/public/img/icon/Uploadicon";
import { navItems, organizations, orgLogos } from "@/src/configs/constants";
import { useUploadImageMutation } from "@/src/redux/services/upload.service";
import {
  useUserInfoQuery,
  useUserInfoUpdateMutation,
} from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";

import BusinessSvg from "@/public/img/icon/BusinessSvg";
import GiftSvg from "@/public/img/icon/GiftSvg";
import CameraSvg from "@/public/img/icon/CameraSvg";
import DbadgeSvg from "@/public/img/icon/DbadgeSvg";
import coverPhoto from "@/public/img/home/cover-bg.png";

const ProfiletLayout = ({ children }) => {
  const pathname = usePathname();
  const isActive = pathname === "/profile/my-business";
  const { data: userInfo, isLoading: loading } = useUserInfoQuery();

  const [
    updateFetchData,
    { isLoading: updateLoading, data, error: updateError },
  ] = useUserInfoUpdateMutation();

  const [
    uploadFetchData,
    { isLoading: uploadLoading, data: uploadData, error: uploadError },
  ] = useUploadImageMutation();
  const [
    cover_uploadFetchData,
    {
      isLoading: cover_upload_loading,
      data: cover_uploadData,
      error: cover_uploadError,
    },
  ] = useUploadImageMutation();

  const firstName = userInfo?.user?.firstName || "";
  const lastName = userInfo?.user?.lastName || "";

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // === Validate file type ===
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        return ErrorAlert("Only JPG, JPEG, or PNG files are allowed");
      }

      const maxSizeMB = 5;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return ErrorAlert(`File size should not exceed ${maxSizeMB}MB`);
      }

      const organization = userInfo?.user?.education?.organization
        ?.split(" ")
        .join("_");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "UserImages/" + organization);

      const response = await uploadFetchData(formData);
      if (response?.data?.status === 200) {
        const res = await updateFetchData({
          avatar: response?.data?.message?.data,
        });
        // window.location.reload();
        if (res?.data?.status === 200) {
          SuccessAlert("Avatar updated successfully");
        }
      } else {
        ErrorAlert("Failed to upload file");
      }
    } catch (error) {
      ErrorAlert("Failed to upload file");
    }
  };

  if (loading) {
    return (
      <div>
        <div className="animate-pulse bg-gray-400 rounded-md max-w-full lg:h-[400px] md:h-[320px] sm:h-[300px] xs:h-[200px] h-[150px]" />
        <ProfileSkeleton />
      </div>
    );
  }

  if (!userInfo?.user) {
    return null; // Middleware or useUserInfo will redirect to /signin
  }

  const orgCover = organizations.find(
    (org) => org.id === userInfo?.user?.organizationId
  );
  const prophytesId = userInfo?.user?.prophytesId;

  const userName = (
    <>
      {firstName} {lastName?.startsWith("#") ? `` : lastName}{" "}
      {prophytesId ? `#${prophytesId}` : `#${userInfo?.user?.id}`}
      <span className="inline-block w-[58px] h-6 align-middle ml-2">
        <Image
          src={orgCover?.miniLogo}
          alt="Verified Badge"
          width={50}
          height={50}
          className="w-full h-full"
        />
      </span>
    </>
  );

  const date = new Date(userInfo?.user.createdAt);

  const memberSince = date?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hanleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSizeMB = 5;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;

      // Validate file type
      if (!validTypes.includes(file.type)) {
        return ErrorAlert("Only JPG, JPEG, or PNG files are allowed");
      }

      if (file.size > maxSizeBytes) {
        return ErrorAlert(`File size should not exceed ${maxSizeMB}MB`);
      }

      const organization = orgCover.organization?.split(" ")?.join("-");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "cover/" + organization);

      const response = await cover_uploadFetchData(formData);

      if (response?.data?.status === 200) {
        const res = await updateFetchData({
          banner: response?.data?.message?.data,
        });
        // window.location.reload();
        if (res?.data?.status === 200) {
          SuccessAlert("Banner updated successfully");
        }
      } else {
        ErrorAlert("Failed to upload file");
      }
    } catch (error) {
      ErrorAlert("Failed to upload file");
    }
  };

  const organization = orgCover?.organization?.split(" ")?.join("-");
  const imageName = userInfo?.user?.banner?.split("/");

  const result = imageName && imageName[4];
  const getColorById = (id) => {
    if (id === 1) return "CFB53B";

    const org = organizations.find((org) => org.id === id);
    return org ? org.color : null;
  };

  const orgColor = getColorById(userInfo?.user?.organizationId);

  return (
    <div className="pb-16 bg-black lg:pb-20">
      <div className="bg-black ">
        <div className="block sm:hidden">
          <Image
            className="max-w-full lg:h-[400px] md:h-[320px] sm:h-[300px] h-[248px]"
            src={
              userInfo?.user?.banner && organization == result
                ? userInfo?.user?.banner
                : orgCover?.cover || coverPhoto
            }
            height={350}
            width={1500}
            alt="profile cover"
          />
        </div>
        <div className="max-w-[1920px] mx-auto px-5  text-white 3xl:px-8 2xl:px-8">
          <div className="relative bg-black ">
            <div className="hidden mx-auto sm:block">
              <Image
                className="w-full lg:h-[404px] md:h-[320px] sm:h-[300px] h-[248px]"
                src={
                  userInfo?.user?.banner && organization == result
                    ? userInfo?.user?.banner
                    : orgCover?.cover || coverPhoto
                }
                height={400}
                width={1500}
                alt="profile cover"
              />
            </div>
            <div className="absolute right-3 sm:bottom-32 bottom-[100px]">
              <label className="flex items-center gap-2 sm:bg-white bg-black text-black sm:p-[14px] p-[6px] sm:rounded-md rounded-full shadow-md cursor-pointer">
                <div className="items-center hidden gap-2 sm:flex">
                  <div className="p-2 text-white bg-black rounded-full">
                    <Uploadicon className="sm:size-[22px] size-4" />
                  </div>
                  <span className=" sm:text-base text-[14px] font-bold text-black leading-[22px]">
                    {cover_upload_loading || updateLoading
                      ? "Uploading..."
                      : "Edit Cover Photo"}
                  </span>
                </div>

                <span>
                  <Camera className="block sm:hidden" />
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={hanleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="2xl:px-[100px] sm:px-10 px-0">
            <div className="grid md:grid-cols-[50%_50%] 3xl:grid-cols-[24.5%_73%] lg:grid-cols-[36%_61%] 2xl:gap-12 gap-8">
              <aside className="">
                <div className="bg-[#141615] sm:py-10 sm:px-10 py-8 px-5 rounded-[20px] relative md:-mt-[30%] -mt-[15%] z-[10] ">
                  {/* Profile Section */}
                  <div className="">
                    <div className="relative">
                      <div className="relative h-[140px] w-[140px] rounded-full border-[6px] border-[#282828] overflow-hidden">
                        <>
                          {uploadLoading || loading ? (
                            <div className="absolute inset-0 bg-gray-700 rounded-full animate-pulse" />
                          ) : (
                            <>
                              <label
                                htmlFor="profile-upload"
                                className="block h-[140px] w-[140px] cursor-pointer"
                              >
                                <Image
                                  className="object-cover w-full h-full rounded-full"
                                  src={
                                    userInfo?.user?.avatar ||
                                    "/default-avatar.png"
                                  }
                                  height={140}
                                  width={140}
                                  alt="profile"
                                />

                                <div className="absolute h-[140px] w-[140px] inset-0 rounded-full bg-black/40"></div>

                                <div className="absolute inset-0 flex items-center justify-center h-[140px] w-[140px]">
                                  <CameraSvg />
                                </div>
                              </label>

                              <input
                                type="file"
                                id="profile-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                              />
                            </>
                          )}
                        </>
                      </div>

                      {/* Verified Badge */}
                      <div
                        className={`absolute -bottom-2  text-white  px-[14px] py-2 rounded-full flex items-center gap-1 `}
                        style={{ backgroundColor: `#${orgColor}` }}
                      >
                        <DbadgeSvg />
                        <span className="text-sm font-medium leading-[22px]">
                          D9 Verified
                        </span>
                      </div>
                    </div>
                    <div className="mt-8 mb-4 ">
                      <h4 className="text-[28px] sm:max-w-[320px] max-w-[220px] leading-10  font-semibold text-white font-montserrat capitalize">
                        {userName}
                      </h4>
                    </div>
                  </div>

                  {/* Menu Section */}
                  <div className="">
                    <nav className="border border-[#383838] rounded-[16px] overflow-hidden">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex gap-3 items-center text-base leading-6 sm:py-5 py-4 px-5 transition-all duration-500 ease-out   text-white  font-medium
              ${pathname === item.href ? "bg-black " : "text-white/70"}  `}
                        >
                          <div
                            className={`flex items-center justify-center w-10 h-10 border border-[#383838] rounded-full  ${
                              pathname === item.href
                                ? "bg-white text-black"
                                : "text-white"
                            }`}
                          >
                            {item.icon}
                          </div>
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {/* Businesses Section */}
                  <Link
                    href="/profile/my-business"
                    className={`  flex items-center justify-between rounded-[16px] py-4 px-5 border border-[#383838] mt-4 ${
                      isActive ? "bg-black" : "bg-[#141616]"
                    }`}
                  >
                    <span className="flex items-center gap-3 text-sm font-medium text-white">
                      <span
                        className={`flex items-center justify-center w-10 h-10 border border-[#383838] rounded-full  text-black ${
                          isActive ? "bg-white" : ""
                        }

                          `}
                      >
                        <BusinessSvg
                          className={`${
                            isActive ? "text-black" : "text-white"
                          }`}
                        />
                      </span>
                      My Businesses
                    </span>
                    <span className="">
                      <GiftSvg orgColor={`#${orgColor}`} />
                    </span>
                  </Link>

                  {/* Member Since */}
                  <p className="mt-4 text-sm leading-[22px] text-white/70">
                    Member Since: {memberSince}
                  </p>
                </div>
              </aside>
              {/* Page Content */}
              <main className="sm:mt-5 md:mt-[60px] mt-0">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfiletLayout;
