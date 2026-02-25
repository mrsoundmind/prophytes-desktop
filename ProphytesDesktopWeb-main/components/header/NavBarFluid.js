"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useUserInfoQuery } from "@/src/redux/services/userApi";
import UserDropdown from "./UserDropdown";
import BottomNav from "./BottomNav";

import logo from "@/public/img/logo/Prophytes-with-trademark.svg";
import AngleRight from "@/public/img/icon/AngleRight";

const NavBarFluid = ({ width }) => {
  const router = useRouter();
  const { data: userInfo, isLoading: loading } = useUserInfoQuery();
  const [user, setUser] = useState("");
  useEffect(() => {
    const email = localStorage.getItem("email");
    setUser(email);
  }, []);

  const handleSignup = () => {
    localStorage.removeItem("currentPage");

    router.push("/onboard");
  };
  return (
    <header className={`bg-black `}>
      <div
        className="px-6 mx-auto text-white 3xl:px-8 2xl:px-8"
        style={{ maxWidth: `${width}` }}
      >
        <div className="flex items-center justify-between gap-2 ">
          <div className="relative">
            <Link href="/">
              <Image className="sm:w-[198px] w-[140px]" src={logo} alt="logo" />
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center py-5 space-x-2 animate-pulse">
              <div className="sm:h-[60px] xs:h-[47px] h-[31px] sm:w-[160px] xs:w-[105px] w-[88px] rounded-[99px] bg-gray-300"></div>

              {/* Sign Up Skeleton (button with icon placeholder) */}
              <div className="sm:h-[60px] xs:h-[47px] h-[31px] sm:w-[160px] xs:w-[105px] w-[88px] rounded-[99px] bg-gray-300 flex items-center justify-between px-2">
                <div className="h-[70%] w-[60%] bg-black rounded-[99px]"></div>
                <div className="w-3 h-3 bg-white rounded-full sm:w-6 sm:h-6"></div>
              </div>
            </div>
          ) : userInfo?.user ? (
            <UserDropdown />
          ) : (
            <div className="flex items-center py-6 space-x-2">
              <Link
                href="/signin"
                className={`font-inter flex items-center justify-center group sm:w-[100px] w-[61px] sm:h-[54px] h-9  border font-medium border-white rounded-[99px] sm:text-lg text-[12px] sm:leading-[26px] leading-[18px] transform transition-all duration-500 hover:text-black hover:border-white overflow-hidden
             before:absolute before:content-[''] before:w-full before:h-0 before:left-0 before:rounded-[99px] before:top-0 before:z-[1]
             before:bg-white before:transition-all before:duration-500
             hover:before:h-full hover:before:top-auto hover:before:bottom-0`}
              >
                <span className="relative z-[99] transition-all duration-300 ease-in-out text-white group-hover:text-black">
                  Log In
                </span>
              </Link>
              <button
                onClick={handleSignup}
                className="group relative inline-flex m-auto sm:gap-[18px] gap-1 items-center sm:w-[160px] w-[115px] h-10 sm:h-[66px]  overflow-hidden  bg-white border-white rounded-[99px]    transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto  "
              >
                <span className="flex items-center justify-center ml-[5px] sm:h-[54px] h-8 sm:w-[108px]  w-full bg-black sm:text-lg text-[12px]  font-medium  text-white sm:leading-[26px] leading-[18px]   rounded-[99px]">
                  <span className="relative z-[9] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                    Sign Up
                  </span>
                </span>

                <span className="pr-2 mt-1 sm:pr-3 sm:mt-3">
                  <AngleRight className="text-black group-hover:text-white relative z-[99] xs:size-6 size-4 transition-all duration-500 ease-out" />
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-50 block w-full sm:hidden">
        <BottomNav />
      </div>
    </header>
  );
};

export default NavBarFluid;
