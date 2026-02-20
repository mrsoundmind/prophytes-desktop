"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Arrowicon from "@/public/img/icon/Arrowicon";
import AngleRight from "@/public/img/icon/AngleRight";

const NextPreviousButton = ({
  previous,
  next,
  NextButtonDisabled = false,
  disabled,
  backFn,
  fn,
  nextButtonText = "Continue",
  hideNextOnMobile,
}) => {
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!NextButtonDisabled) {
      setError(false);
    }
  }, [NextButtonDisabled]);
  const handleNext = () => {
    if (!NextButtonDisabled) {
      if (fn) {
        fn();
      }
      if (next !== " ") {
        router.push(`/${next}`);
      }
    } else {
      setError(true);
    }
  };

  const handleBack = () => {
    if (backFn) {
      backFn();
    }
    if (previous !== " ") {
      router.push(`/${previous}`);
    }
  };
  return (
    <div>
      <p
        className={`${error ? "block" : "hidden"
          } text-red-500 text-center text-sm mb-5 xl:mb-10`}
      >
        Please fill in all the fields.
      </p>
      <div className="flex flex-wrap items-center justify-between pb-0 sm:pb-4 ">
        <button
          onClick={handleBack}
          className={`${previous === "" && "hidden"} flex gap-3 items-center`}
        >
          <span>
            <Arrowicon />
          </span>
          <span
            className={`py-[15px] text-[18px] font-medium leading-[26px] text-white   rounded-[99px] font-inter`}
          >
            Back
          </span>
        </button>

        <button
          onClick={handleNext}
          disabled={disabled}
          className={`${next === "" && "hidden"
            } flex  items-center gap-3  sm:h-[60px]  ${disabled ? "bg-primary" : "bg-primary"
            }  group relative    xs:h-[60px] h-[50px] overflow-hidden   border-white rounded-[99px]   transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto ${hideNextOnMobile ? "sm:flex hidden" : "flex"
            } `}
        >
          <span className="ml-[5px]  py-3  xs:px-[26px] px-5  bg-black text-lg   font-medium  text-white   leading-[26px] rounded-[99px]">
            <span className="relative z-[99] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in font-inter">
              {nextButtonText}
            </span>
          </span>
          <span className="">
            <AngleRight className="text-black group-hover:text-white relative z-[99]  transition-all duration-500 ease-out mr-3  " />
          </span>
        </button>
      </div>
    </div>
  );
};

export default NextPreviousButton;
