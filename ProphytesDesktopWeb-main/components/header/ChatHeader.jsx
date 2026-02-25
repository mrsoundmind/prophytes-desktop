"use client";
import logo from "@/public/img/logo/Prophytes-with-trademark.svg";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import BottomNav from "./BottomNav";

const ChatHeader = ({ width }) => {
  const router = useRouter();
  const pathName = usePathname();
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
    <header
      className={`bg-black ${
        pathName.startsWith("/chat/") && "hidden lg:block"
      }`}
    >
      <div
        className="px-6 mx-auto text-white 3xl:px-20 2xl:px-10 h-[70px] md:h-auto "
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
                className={`font-inter group sm:py-[15px] xs:py-[11px] sm:px-5 px-[10px] py-2 border border-white rounded-[99px] sm:text-base xs:text-[12px] text-[9px] font-bold  xs:leading-5 leading-[11px] transform transition-all duration-500 hover:text-black hover:border-white overflow-hidden
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
                className="relative group overflow-hidden flex xs:gap-[10px] gap-1 items-center  sm:h-[60px] xs:h-[47px] h-[31px] sm:w-[160px] xs:w-[105px] w-[88px] border border-secondary rounded-[99px]
                       transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-white xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-black hover:after:w-full hover:after:left-0 hover:after:right-auto  "
              >
                <span className="xs:ml-[5px] ml-1 sm:py-[15px] xs:py-[11px] py-2 sm:px-5 px-[10px] bg-black rounded-[99px] sm:text-base xs:text-[12px] text-[9px] font-bold  xs:leading-5 leading-[11px]">
                  <span className="relative z-[99] text-white group-hover:text-black">
                    Sign Up
                  </span>
                </span>
                <span>
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="sm:size-6 size-3 relative z-[99] text-white group-hover:text-black  transition-all duration-500"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.7497 12.752H3.25V11.252L20.7497 11.252V12.752Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.9998 11.2441C16.4723 11.2441 13.5898 14.3462 13.5898 17.6541V18.4041H15.0898V17.6541C15.0898 15.1426 17.3324 12.7441 19.9998 12.7441H20.7494V11.2441H19.9998Z"
                      fill="currentColor"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.0037 12.7479C16.4762 12.7479 13.5938 9.6458 13.5938 6.33789V5.58789H15.0938V6.33789C15.0938 8.84947 17.3363 11.2479 20.0037 11.2479H20.7534V12.7479H20.0037Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* <div className="fixed bottom-0 left-0 z-50 block w-full sm:hidden">
        <BottomNav />
      </div> */}
    </header>
  );
};

export default ChatHeader;
