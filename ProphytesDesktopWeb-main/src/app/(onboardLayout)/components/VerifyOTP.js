"use client";
import { useOnboardMutation } from "@/src/redux/services/onboardApi";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NextPreviousButton from "./NextPreviousButton";
import OTPInput from "./OTPInput";
import {
  useSendOtpMutation,
  useSetTokenMutation,
} from "@/src/redux/services/userApi";
import MobileStapper from "./MobileStapper";
import { ArrayToObject } from "@/src/utils/ArrayToObject";

const VerifyOTP = () => {
  const [disabled, setDisabled] = useState(true);
  const [otpValue, setOtpValue] = useState("");
  const [haveValue, setHaveValue] = useState(false);
  const [onboading, setOnboading] = useState({});
  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(setOnboardPage("verify-email"));
  };

  const [onboardingData, setOnboardingData] = useState({
    organization: "",
    countryName: "",
    state: "",
    cityName: "",
    university: "",
    underGraduateSchool: "",
    graduateSchool: "",
    initiatedChapter: "",
    classification: "",
  });
  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  const [sendCodeReq, { isLoading, data: sendCodeData, error: sendCodeError }] =
    useSendOtpMutation();

  const router = useRouter();
  const handleOTPChange = (otp) => {
    setOtpValue(otp);
  };

  const [fetchData, { isLoading: loading, data, error }] = useOnboardMutation();
  const [fetchToken, { isLoading: toeknLoading, data: tokenData }] =
    useSetTokenMutation();

  useEffect(() => {
    const onboarding = localStorage.getItem("onboading");
    try {
      const parsedOnboarding = onboarding ? JSON.parse(onboarding) : [];
      if (Array.isArray(parsedOnboarding)) {
        // Map array of objects to onboardingData
        const updatedData = { ...onboardingData };
        parsedOnboarding.forEach((item) => {
          const key = Object.keys(item)[0];
          if (key in updatedData) {
            updatedData[key] = item[key];
          }
        });
        setOnboardingData(updatedData);
      }
    } catch (err) {
      console.error("Error parsing onboarding data:", err);
    }
  }, []);

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");
    if (!email || !otpValue || otpValue.length !== 6) {
      ErrorAlert("Please enter a valid email and 6-digit OTP");
      return;
    }

    // Construct payload with data object as per backend structure
    const finalPayload = {
      email,
      code: otpValue,
      data: { ...onboardingData }, // Nest onboardingData under 'data'
    };

    await fetchData(finalPayload);
  };
  const handlereSend = () => {
    sendCodeReq({ email: localStorage.getItem("email") });
  };

  useEffect(() => {
    if (sendCodeData) {
      SuccessAlert("OTP sent successfully");
    }
    if (sendCodeError) {
      ErrorAlert(
        sendCodeError?.data?.data?.issue?.message || "Failed to send OTP"
      );
    }
  }, [sendCodeData, sendCodeError]);

  useEffect(() => {
    if (data) {
      SuccessAlert("OTP verified successfully");
      localStorage.setItem("token", data?.data?.token);
      SaveOnboadingData({ isVerified: true });
      setDisabled(false);
      dispatch(setOnboardPage("pending-verification"));
    }
    if (error) {
      ErrorAlert(error?.data?.data?.issue?.message || "Invalid OTP");
    }
  }, [data, router, error]);
  useEffect(() => {
    if (onboading.email) {
      setHaveValue(true);
    }
  }, [onboading]);

  useEffect(() => {
    // const token = localStorage.getItem("token");

    if (data?.data?.token) {
      fetchToken({ token: data?.data?.token });
    }
  }, [data?.data?.token]);

  return (
    <div>
      <MobileStapper disabled={disabled} haveValue={haveValue} />
      <h3 className="mb-3 sm:mb-4 font-montserrat">Check your email</h3>
      <h5 className="sm:text-lg text-sm text-[#A2A2A8] font-medium sm:leading-[26px] leading-[18px] mb-3">
        We sent a 6-digit code to {onboading?.email || localStorage.getItem("email") || "your email"}. This secures your Prophytes #.
      </h5>
      <div className="mt-4 2xl:mt-8">
        <div className="2xl:p-12 p-6 bg-black rounded-[16px] border border-[#383838]">
          <h4 className="md:mb-5 mb-3 md:text-2xl text-xl font-semibold sm:leading-9 leading-[30px] text-white sm:text-left text-center">
            Enter the verification code
          </h4>
          <div className="flex justify-center sm:justify-start">
            <OTPInput length={6} onChangeOTP={handleOTPChange} />
          </div>

          <button
            disabled={loading}
            className="w-full px-6 py-5 mt-0 sm:text-lg text-base sm:leading-[26px] leading-5 font-medium text-black transition rounded-full sm:mt-2 bg-primary hover:bg-secondary font-inter"
            onClick={handleSubmit}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
        <div className="flex items-center mt-4 ">
          <p className="text-[#A2A2A8] text-lg font-normal leading-7">
            Didn&apos;t receive it?{" "}
          </p>
          <button
            onClick={handlereSend}
            disabled={isLoading}
            className="text-lg font-normal leading-7 text-white ml-[2px] underline"
          >
            {isLoading ? "Sending...." : "Resend code "}
          </button>
        </div>
        <div className="mt-10 sm:mt-12">
          <NextPreviousButton
            backFn={handlePrev}
            previous=" "
            next=""
            NextButtonDisabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
