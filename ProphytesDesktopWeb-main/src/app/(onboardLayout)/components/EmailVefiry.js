"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ArrayToObject } from "@/src/utils/ArrayToObject";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import { SuccessAlert } from "@/src/utils/SuccessAlert";

import { useSendOtpMutation } from "@/src/redux/services/userApi";
import {
  setCity,
  setCountry,
  setOnboardPage,
  setState,
} from "@/src/redux/slices/onboardingSlice";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { useDispatch } from "react-redux";
import NextPreviousButton from "./NextPreviousButton";
import Stepper from "./Stapper";
import EmailSvg from "@/public/img/icon/EmailSvg";
import ShieldSvg from "@/public/img/icon/ShieldSvg";
import AngleRight from "@/public/img/icon/AngleRight";
import MobileStapper from "./MobileStapper";

const EmailVefiry = () => {
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const [onboading, setOnboading] = useState({});
  const [haveValue, setHaveValue] = useState(false);
  const dispatch = useDispatch();
  const [fetchData, { isLoading: loading, data, error }] = useSendOtpMutation();

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  useEffect(() => {
    if (onboading?.email) {
      setEmail(onboading?.email);
      setDisabled(false);
    }

    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onboading]);

  const isUndergraduate = onboading?.classification === "Undergraduate";
  const isEduEmail = /@.+\.edu(\.|$)/i.test(email.trim());

  const handleSubmit = (e) => {
    e.preventDefault();

    // DEV ONLY — bypass email sending for local testing
    if (process.env.NEXT_PUBLIC_DEV_BYPASS_OTP === "true") {
      console.log("🛠️ [DEV MODE] Bypassing OTP API call");
      // Simulate success delay
      setTimeout(() => {
        // Task 5.B.1: Use production-like message or suppress specific "DEV MODE" alert if preferred.
        // Keeping it generic or reusing the standard success message.
        SuccessAlert("OTP sent successfully");
        localStorage.setItem("email", email);
        SaveOnboadingData({ email });
        // Set mock OTP for next step verification (if needed by next step bypass)
        localStorage.setItem("devOtpCode", "123456");

        // Advance to next step
        dispatch(setOnboardPage("verify-code"));
      }, 500);
      return;
    }

    // if (isUndergraduate && !isEduEmail) {
    //   ErrorAlert("Undergraduate users must use a .edu email address");
    //   return;
    // }

    fetchData({ email });
  };

  useEffect(() => {
    if (data) {
      SuccessAlert("OTP sent successfully");
      localStorage.setItem("email", email);
      SaveOnboadingData({ email });
      setDisabled(false);

      const timer = setTimeout(() => {
        dispatch(setOnboardPage("verify-code"));
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [data, email, dispatch]);

  useEffect(() => {
    if (error) ErrorAlert(error?.data?.data?.issue?.message);
  }, [error]);

  const handlePrev = () => {
    // dispatch(setOnboardPage("joined-year"));
    dispatch(setOnboardPage("initiated-chapter"));

    if (!isMobile) {
      dispatch(
        setCountry({
          id: localStorage.getItem("countryId"),
          name: onboading.countryName,
        })
      );

      dispatch(
        setState({
          id: localStorage.getItem("stateId"),
          name: onboading.state,
        })
      );

      dispatch(
        setCity({
          id: localStorage.getItem("cityId"),
          name: onboading.cityName,
        })
      );
    }
  };
  useEffect(() => {
    if (onboading.initiatedChapter) {
      setHaveValue(true);
    }
  }, [onboading]);

  const emailPlaceholder =
    onboading?.classification === "Undergraduate"
      ? "name@school.edu"
      : "your-mail@email.com";

  return (
    <div className="2xl:p-12 sm:p-6 p-0 bg-black rounded-[8px]">
      <div className="">
        <MobileStapper disabled={disabled} haveValue={haveValue} />
      </div>
      <div className="">
        <h3 className="">Claim your prophytes #</h3>
        <h5 className="md:text-lg text-sm text-[#E7E7EB] font-medium md:leading-[26px] leading-[22px] md:mt-5 mt-3 mb-3">
          We&apos;ll send a one-time code to confirm your email and protect the
          community.
        </h5>
        <div
          className={`text-sm text-[#A2A2A8] font-normal flex items-center leading-[22px] mb-4 gap-2 ${!isUndergraduate && "2xl:mb-10"
            }`}
        >
          <div className="bg-white rounded-full size-2" /> Next: unlock your
          chapter connection.
        </div>

        {/* DEV ONLY Helper Text - HIDDEN PER TASK 5.B.1 */}
        {/* {process.env.NEXT_PUBLIC_DEV_BYPASS_OTP === "true" && (
          <p className="text-xs text-yellow-500 font-mono mb-2">
            ⚠️ DEV MODE: Email verification will be bypassed.
          </p>
        )} */}
        {isUndergraduate && (
          <div className="text-sm text-[#A2A2A8] font-normal flex items-center leading-[22px]  2xl:mb-10 mb-4 gap-2">
            <div className="bg-white rounded-full size-2" /> Use .edu to unlock
            sponsored Elite Profile (students)
          </div>
        )}
      </div>

      <label className="text-base leading-6 text-[#B2B2B2]">Enter Email</label>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          placeholder={emailPlaceholder}
          value={email}
          autoComplete="on"
          onChange={({ target }) => setEmail(target.value)}
          autoFocus
          className={`mt-3
                         appearance-none font-inter focus:outline-none bg-[#141616] text-white w-full  sm:py-[18px] py-3 sm:px-[56px] px-[52px] rounded-[8px] text-base  placeholder:text-base font-normal placeholder:text-[#B2B2B2] leading-6 border border-[#383838]`}
          required
        />
        <span className="absolute sm:top-8 top-7 left-5">
          <EmailSvg />
        </span>
        <p className="text-sm text-[#A2A2A8] font-normal leading-[22px] flex sm:items-center items-start  gap-2 mb-6 mt-3">
          <span className="inline-block">
            <ShieldSvg className="mt-1 sm:mt-0" />
          </span>
          Private by design. We don&apos;t show your selection publicly until
          you&apos;re verified
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`flex  items-center gap-3  sm:h-[60px]   group relative    xs:h-[60px] h-[50px] overflow-hidden sm:w-[228px] w-full   bg-white  border-white rounded-[99px]   transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0  after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto `}
        >
          <span className="ml-[5px]  py-3  sm:w-[163px] w-full  bg-black xs:text-lg text-[13px] font-inter font-medium  text-white xs:leading-[26px]  leading-4 rounded-[99px]">
            <span className="relative z-[99] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in font-inter">
              {loading ? "Sending..." : " Send my code"}
            </span>
          </span>
          <span className="">
            <AngleRight className="text-black group-hover:text-white relative z-[99]  transition-all duration-500 ease-out mr-3  " />
          </span>
        </button>
      </form>
      <p className="text-sm leading-[22px] font-normal text-[#A2A2A8] mt-5">
        Code arrives in 10-30 seconds. Check spam/Promotions.
      </p>

      <div className="mt-5 2xl:mt-20">
        <NextPreviousButton
          backFn={handlePrev}
          previous=" "
          next=""
          NextButtonDisabled={disabled}
        />
      </div>
    </div>
  );
};

export default EmailVefiry;
