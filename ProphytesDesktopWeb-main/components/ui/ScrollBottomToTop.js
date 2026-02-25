"use client";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";

const ScrollBottomToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { data: userInfo, isLoading: loading } = useUserInfoQuery();

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`moveTop flex items-center  justify-center fixed  right-6 p-3 leading-[42px] h-10 w-10 bg-primary border text-black z-[1001] rounded-[50%] cursor-pointer transform transition-all duration-500 ease-in-out ${
        userInfo?.user ? "bottom-[70px]" : "bottom-10"
      } ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <FontAwesomeIcon
        icon={faArrowUp}
        className="text-black size-4 relative z-[999]"
      />
    </button>
  );
};

export default ScrollBottomToTop;
