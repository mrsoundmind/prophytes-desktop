"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import LogoutSvg from "@/public/img/icon/LogoutSvg";
import Messageicon from "@/public/img/icon/Messageicon";
import OrgSvg from "@/public/img/icon/OrgSvg";
import ProfileSvg from "@/public/img/icon/ProfileSvg";
import SearchIconSvg from "@/public/img/icon/SearchIconSvg";
import SubscriptionSvg from "@/public/img/icon/SubscriptionSvg";
import { organizations } from "@/src/configs/constants";
import api from "@/src/redux/services/api";
import { useUnreadMessageQuery } from "@/src/redux/services/conversationApi";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/src/redux/services/userApi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Notification from "../ui/Notification";
import GraduationCap from "@/public/img/icon/GraduationCap";

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const newConversationReq = useSelector(
    (state) => state.conversation.newConversation
  );

  const userStatus = useSelector((state) => state.user.status);

  const {
    data: userInfo,
    isLoading: user_loading,
    refetch: refetchUser,
  } = useUserInfoQuery();
  const { data: message, isLoading, refetch } = useUnreadMessageQuery();

  const totalCount = Number(message?.data?.pendingConversationCount);

  const dispatch = useDispatch();
  const router = useRouter();
  const [logout, logoutRes] = useLogoutMutation();

  const handleLogout = async () => {
    await logout().unwrap();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("onboading");
    localStorage.removeItem("phone");

    dispatch(api.util.resetApiState());
    router.refresh();
    window.location.href = "/signin";
  };

  // useEffect(() => {
  //   if (logoutRes?.isSuccess) {
  //     localStorage.removeItem("email");
  //     localStorage.removeItem("onboading");
  //     localStorage.removeItem("phone");
  //     router.refresh();
  //   }
  //   if(logoutRes?.isError){
  //     ErrorAlert("Logout failed. Please try again.");
  //   }
  // },[logoutRes, router]);

  const organization = () => {
    const org = organizations.find(
      (item) => item.id === userInfo?.user?.organizationId
    );

    return org || null;
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false); // close modal
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (newConversationReq) refetch();
  }, [newConversationReq]);

  useEffect(() => {
    if (userStatus) {
      refetchUser();
    }
  }, [userStatus]);

  const trimmedEmail = userInfo?.user?.email?.trim().toLowerCase() ?? "";

  const looksLikeEduEmail = trimmedEmail && /@[^@]+\.edu$/i.test(trimmedEmail);

  return (
    <div className="relative z-[9999] py-6  ">
      <div className="inline-block ">
        <div className="flex items-center gap-3 ">
          <div
            onClick={() => router.push("/chat")}
            className="relative items-center justify-center hidden w-12 h-12 bg-white rounded-full cursor-pointer sm:flex"
          >
            <Messageicon className="text-black" />
            {totalCount > 0 && (
              <span
                className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white rounded-full"
                style={{ backgroundColor: `#${organization()?.color}` }}
              >
                {!isLoading && totalCount}
              </span>
            )}
          </div>

          <Notification
            userId={userInfo?.user?.id}
            orgColor={organization()?.color}
          />
          <div
            // onClick={() => router.push("/chat")}
            className="relative flex items-center justify-center w-12 h-12 rounded-full cursor-not-allowed bg-white/20 sm:hidden"
          >
            <SearchIconSvg className="text-black" />
          </div>

          <div className="relative hidden group sm:block ">
            <div className="  flex items-center gap-2 w-[80px] cursor-pointer group">
              <div
                className="flex justify-end text-left "
                onClick={() => setIsOpen(!isOpen)}
              >
                <Image
                  className="rounded-full size-12 "
                  src={userInfo?.user?.avatar || "/img/dummy-user.png"}
                  alt="User small"
                  width={40}
                  height={40}
                />
              </div>
              <span>
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`text-white transition-all duration-500 ease-out cursor-pointer ${
                    isOpen && "rotate-180"
                  }`}
                >
                  <path
                    d="M11.0001 12.0001C10.7443 12.0001 10.4883 11.9023 10.2931 11.7071L0.293063 1.70706C-0.0976876 1.31631 -0.0976876 0.683563 0.293063 0.293063C0.683813 -0.0974376 1.31656 -0.0976876 1.70706 0.293063L11.0001 9.58607L20.2931 0.293063C20.6838 -0.0976876 21.3166 -0.0976876 21.7071 0.293063C22.0976 0.683813 22.0978 1.31656 21.7071 1.70706L11.7071 11.7071C11.5118 11.9023 11.2558 12.0001 11.0001 12.0001Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </div>
            <div
              ref={modalRef}
              className={`absolute right-0 top-16 space-y-5 sm:p-[30px] p-6 sm:w-[378px] w-[300px] bg-white rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
                isOpen
                  ? "scale-100 opacity-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <div className="relative flex gap-6 py-3 border-b">
                <div className="">
                  <div className="w-20 h-20">
                    <Image
                      className="w-full h-full rounded-full"
                      src={userInfo?.user?.avatar || "/img/dummy-user.png"}
                      alt="User small"
                      width={80}
                      height={80}
                    />
                  </div>
                  <span
                    className="absolute left-[20%] top-[18px] w-[24px] h-[24px] flex items-center justify-center rounded-full border-white border-[2px] z-[999]"
                    style={{
                      backgroundColor: userInfo?.user?.isPaid
                        ? `#${organization()?.color}`
                        : "#16AD4B",
                    }}
                  >
                    <OrgSvg />
                  </span>
                </div>
                <div>
                  <h4 className="text-lg font-bold sm:leading-[36px] leading-7 text-black sm:text-2xl font-montserrat">
                    {userInfo?.user?.firstName} #{userInfo?.user?.id}
                  </h4>
                  <p className={`font-inter text-black pt-[10px]`}>
                    {organization()?.organization}
                  </p>
                </div>
              </div>

              <li className="text-[17px] font-normal leading-5 text-black list-none">
                <Link className="flex gap-[15px] items-center" href="/profile">
                  <ProfileSvg />
                  <span>Profile</span>
                </Link>
              </li>

              {userInfo?.user?.isVerified ? (
                <li className="text-[17px] font-normal leading-5 text-black border-b border-[#E7E7EB] pb-7 list-none">
                  {looksLikeEduEmail ? (
                    <div className="flex items-center gap-[15px]">
                      <GraduationCap />
                      <span className="-mt-[7px]">Elite Student</span>
                    </div>
                  ) : (
                    <Link
                      href={
                        userInfo?.user?.isPaid
                          ? "/subscriptionDetails"
                          : "/choose-plan"
                      }
                      className="flex items-center gap-[15px]"
                    >
                      <SubscriptionSvg />
                      <span className="-mt-[7px]">
                        {userInfo?.user?.isPaid
                          ? "Subscription Details"
                          : "Get Premium"}
                      </span>
                    </Link>
                  )}
                </li>
              ) : (
                <li className="text-[17px] font-normal leading-5 text-black border-b border-[#E7E7EB] pb-7 list-none">
                  <Link
                    href="/account-status"
                    className="flex items-center gap-[15px]"
                  >
                    <SubscriptionSvg />
                    <span className="-mt-[7px]">Get Verified</span>
                  </Link>
                </li>
              )}

              <button
                onClick={handleLogout}
                className="flex gap-[19px] items-center text-[17px] font-normal leading-5 text-black list-none"
              >
                <LogoutSvg />
                <span>
                  {logoutRes?.isLoading ? "Logging out..." : "Log Out"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
