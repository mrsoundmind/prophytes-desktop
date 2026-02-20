"use client";
import { useEffect, useState } from "react";
import Identity from "./Identity";
import NextPreviousButton from "./NextPreviousButton";
import { useDispatch } from "react-redux";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import MobileStapper from "./MobileStapper";
import { ArrayToObject } from "@/src/utils/ArrayToObject";

const InitiatedChapter = () => {
  const [disabled, setDisabled] = useState(true);
  const [onboading, setOnboading] = useState({});
  const [haveValue, setHaveValue] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  useEffect(() => {
    if (onboading.organization) {
      setHaveValue(true);
    }
  }, [onboading]);

  const handleNext = () => {
    dispatch(setOnboardPage("verify-email"));
  };

  const handlePrev = () => {
    dispatch(setOnboardPage(""));
  };

  return (
    <>
      <div className="">
        <MobileStapper disabled={disabled} haveValue={haveValue} />
      </div>
      <div className="2xl:p-12 sm:p-6 p-0 bg-black rounded-[8px]">
        {/* Form Content */}
        <div className="mb-4 2xl:mb-10">
          <h3 className="text-white font-montserrat">Find your chapter</h3>
          <p className="sm:text-lg text-[15px] text-[#A2A2A8] font-normal sm:leading-7 leading-6 mt-3">
            This is how we connect you to the right chapter and help you come
            back home.
          </p>
        </div>

        <div className="">
          <div>
            <h5 className="text-[22px] text-white sm:text-xl leading-[32px] mb-4">
              Where were you initiated?
            </h5>
            <Identity setDisabled={setDisabled} />
          </div>

          <div className="pb-8 mt-6 2xl:mt-10 sm:pb-0">
            <NextPreviousButton
              fn={handleNext}
              backFn={handlePrev}
              previous=" "
              next=" "
              NextButtonDisabled={disabled}
              hideNextOnMobile={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InitiatedChapter;
