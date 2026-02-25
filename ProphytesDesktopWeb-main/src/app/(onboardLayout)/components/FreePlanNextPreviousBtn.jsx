import Arrowicon from "@/public/img/icon/Arrowicon";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import React from "react";
import { useDispatch } from "react-redux";

const FreePlanNextPreviousBtn = () => {
  const dispatch = useDispatch();
  const handlePrev = () => {
    dispatch(setOnboardPage("upload-image"));
  };
  const handleSkip = () => {
    dispatch(setOnboardPage("proof-membership"));
  };
  return (
    <div className="flex flex-wrap items-center justify-between pb-0 my-5 sm:pb-4 sm:my-10">
      <button onClick={handlePrev} className={` flex gap-3 items-center`}>
        <span>
          <Arrowicon />
        </span>
        <span
          className={`font-inter  py-[15px] sm:text-[16px] text-[14px] font-bold leading-5 text-white   rounded-[99px]`}
        >
          Back
        </span>
      </button>

      <button
        onClick={handleSkip}
        className={` flex  items-center gap-2  sm:h-[60px]
          bg-primary
          group relative    xs:h-[60px] h-[50px] overflow-hidden   border-white rounded-[99px]   transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto `}
      >
        <span className="ml-[5px]  xs:py-[15px] py-3  xs:px-5 px-5  bg-black xs:text-base text-[13px]  font-bold  text-white xs:leading-5  leading-4 rounded-[99px]">
          <span className="relative z-[99] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
            Join the Network — Free
          </span>
        </span>
        <span className="">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black group-hover:text-white relative z-[99]  transition-all duration-500 ease-out mr-3  "
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.7497 12.751H3.25V11.251L20.7497 11.251V12.751Z"
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
  );
};

export default FreePlanNextPreviousBtn;
