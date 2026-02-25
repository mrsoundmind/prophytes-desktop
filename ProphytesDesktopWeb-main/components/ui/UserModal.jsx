"use client";

import { useEffect } from "react";
import GraduationCap from "@/public/img/icon/GraduationCap";
import LogoutSvg from "@/public/img/icon/LogoutSvg";
import OrgSvg from "@/public/img/icon/OrgSvg";
import ProfileSvg from "@/public/img/icon/ProfileSvg";
import SubscriptionSvg from "@/public/img/icon/SubscriptionSvg";
import { organizations } from "@/src/configs/constants";
import api from "@/src/redux/services/api";
import {
  useLogoutMutation,
  useUserInfoQuery,
} from "@/src/redux/services/userApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const UserModal = ({ userModal, setUserModal }) => {
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const [logout, logoutRes] = useLogoutMutation();
  const dispatch = useDispatch();
  const router = useRouter();

  /* 🔒 BODY SCROLL LOCK */
  useEffect(() => {
    if (userModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [userModal]);

  const handleLogout = async () => {
    await logout().unwrap();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("onboading");
    localStorage.removeItem("phone");

    dispatch(api.util.resetApiState());

    router.refresh();
    window.location.href = "/signin";
    setUserModal(false);
  };

  const organization = () => {
    const org = organizations?.find(
      (item) => item.id === userInfo?.user?.organizationId
    );
    return org || null;
  };

  const trimmedEmail = userInfo?.user?.email?.trim().toLowerCase() ?? "";
  const looksLikeEduEmail = trimmedEmail && /@[^@]+\.edu$/i.test(trimmedEmail);

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center transition-opacity duration-300
        ${
          userModal
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={() => setUserModal(false)}
      />

      {/* Modal */}
      <div
        className={`relative mt-20 space-y-5 bg-white rounded-lg shadow-lg z-50
          sm:p-[30px] p-6 sm:w-[378px] w-[300px]
          transform transition-all duration-300
          ${userModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="relative flex items-center gap-6 px-0 py-3 border-b sm:px-4">
          <div>
            <div className="w-20 h-20">
              <Image
                className="w-20 h-20 rounded-full"
                src={userInfo?.user?.avatar || "/img/dummy-user.png"}
                alt="User small"
                width={80}
                height={80}
              />
            </div>

            <span
              className="absolute left-[24%] top-[18px] w-[24px] h-[24px] flex items-center justify-center rounded-full border-white border-[2px]"
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
            <h4 className="sm:text-[22px] text-lg font-bold text-black">
              {userInfo?.user?.firstName} #{userInfo?.user?.id}
            </h4>
            <p className="pt-[10px] text-black">
              {organization()?.organization}
            </p>
          </div>
        </div>

        <li className="list-none text-[17px] text-black">
          <Link
            href="/profile"
            className="flex items-center gap-[15px]"
            onClick={() => setUserModal(false)}
          >
            <ProfileSvg />
            <span>Profile</span>
          </Link>
        </li>

        {userInfo?.user?.isVerified ? (
          <li className="list-none border-b border-[#E7E7EB] pb-7 text-[17px] text-black">
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
          <li className="list-none border-b border-[#E7E7EB] pb-7 text-[17px] text-black">
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
          className="flex items-center gap-[15px] text-[17px] text-black"
        >
          <LogoutSvg />
          <span>{logoutRes?.isLoading ? "Logging out..." : "Log Out"}</span>
        </button>
      </div>
    </div>
  );
};

export default UserModal;
